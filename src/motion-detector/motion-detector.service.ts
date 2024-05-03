import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Gpio } from 'pigpio';
import { MotionDetectorSettingsDto } from './dto/motion-detector.settings.dto'
import { MotionDetectorCommandDto } from './dto/motion-detector.command.dto';
import { MotionDetectorScriptDto } from './dto/motion-detector.script.dto';
import { map, lastValueFrom } from 'rxjs';

const MICROSECONDS_PER_CM = 1e6 / 34321;

@Injectable()
export class MotionDetectorService {
    private trigger: Gpio;
    private echo: Gpio;
    private isRunning: boolean = false;
    //private readonly LIGHT_CONTROLLER_URL = 'http://localhost:3000/light';

    constructor(private readonly httpService: HttpService) {}

    // Internal settings
    settings = {
        controllerURL: '',
        script: [],
        repeat: 0,
        status: false,
        threshold: 20,
    }

    // Activity log
    logs = {
        log: []
    }

    // Delay call to provide wait time for scripts
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

        // Response to /device call
    status(): String {
        console.log("*** motion-detector status");
        return (this.settings.status) ? "Motion Detector ON" : "Motion Detector OFF";
    }

    // return the data in the log
    log() {
        console.log("*** motion-detector log");
        return this.logs;
    }

    getScript(): any {
        console.log("*** motion-detector getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // start the script and return
    start(): any {
        console.log("*** motion-detector start");
        this.runScript();
        return true;
    }

    async runScript() {
        // Repeat the full script
        console.log("Repeat:", this.settings.repeat);
        for(let i=0; i < this.settings.repeat; i++) {
            console.log("Current repeat: ", i);
            // Each step of the script
            console.log("Steps in script: ", this.settings.script.length);
            for(let j=0; j < this.settings.script.length; j++) {
                console.log("Current step:", j);
                // Run the command from the script
                this.command(this.settings.script[j]);
                // Wait specified number of seconds
                await this.delay(this.settings.script[j].delay * 1000);
            }
        }
    }

    // response to /settings
    async deviceSettings(settings: MotionDetectorSettingsDto): Promise<boolean> {
        console.log("*** motion-detector deviceSettings:", settings);
        let result = false;
        if(settings.controllerURL.length > 0) {
            this.settings.controllerURL = settings.controllerURL;
            result = true;
        }
        this.startMeasurements();
        return result;
    }

    // Script for simulation
    async script(script: MotionDetectorScriptDto): Promise<boolean> {
        console.log("*** card-reader script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    // Response to /start, initialises sensor and starts measuring
    startMeasurements() {
        console.log("*** motion-detector start")
        this.settings.status = true;
        this.trigger = new Gpio(23, { mode: Gpio.OUTPUT });
        this.echo = new Gpio(24, { mode: Gpio.INPUT, alert: true });
        this.trigger.digitalWrite(0);
        this.startSensor();
        
        setInterval(() => {
        this.trigger.trigger(10, 1);
        }, 1000);
    }

    // Response to /stop
    stopMeasurements() {
        console.log("*** motion-detector stop")
        this.settings.status = false;
    }

    

    // function to start measuring distance using sensor
    startSensor() {
        let startTick;

        this.echo.on('alert', (level, tick) => {
        if (this.settings.status && level === 1) {
            startTick = tick;
        } else if (this.settings.status) {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0);
            const distance = diff / 2 / MICROSECONDS_PER_CM;
            if(distance < this.settings.threshold){
                console.log('*** motion-detector Motion detected at ', distance.toFixed(2), 'cm')
                this.logs.log.push({time: Date.now(), action: 'Motion Detected', distance: distance})
                this.sendAction();
            } 
        }
        });
    }

    // Command sent to device to simulate a trigger
    async command(action: MotionDetectorCommandDto): Promise<boolean> {
        console.log("*** motion-detector command:", action);
        let result = false;

        // check action
        switch(action.action) {
            case 'Motion Detected':
                result = await this.sendAction();
                this.logs.log.push({time: Date.now(), action: 'Motion Detected'})
                break;
            default:
                console.log("*** Undefined action");
        }
        return result
    }

    async sendAction(): Promise<boolean> {
        console.log("*** motion-detector sendAction");
        let result = false;
        if(this.settings.controllerURL.length>0) {
            console.log("Send: ", {action: 'Motion Detected'})
            console.log("Send to ", this.settings.controllerURL)

            const requestConfig = {
                headers: {
                    'Content-Type' : 'application/json'
                }
            };

            const dataSend = {action: "Motion Detected"}

            const responseData = await lastValueFrom(
                this.httpService.post(this.settings.controllerURL, dataSend, requestConfig).pipe(
                    map((response) => {
                        return response.data;
                    }),
                ),
            );
            console.log("From POST call: ", responseData);
            result = true
        }
        else {
            console.log("sendAction - URL not in settings");
        }
        return result;
        // try {
        //     //await this.httpService.get(`${this.LIGHT_CONTROLLER_URL}/on`).toPromise();
        //     await this.httpService.get(`${this.settings.controllerURL}/command`);
        //     console.log('*** motion-detector Distance sent to controller');
        // } catch (error) {
        //     console.error('*** motion-detector Error connecting to controller', error.message);
        // }
    }

    getLogScript() {
        const script = [];
        const logs = this.logs.log

        for (let i = 0; i < logs.length; i++) {
            let delay;
            
            if(i == logs.length-1) {
                delay = 10
            }
            else {
                delay = Math.round((logs[i+1].time - logs[i].time)/1000);
            }
            script.push({action: logs[i].action, delay: delay});
        }

        console.log(script);
        this.settings.script = script;
        this.settings.repeat = 2;
    }
}