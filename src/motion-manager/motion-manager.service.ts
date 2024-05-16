import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, lastValueFrom, timer, Subscription } from 'rxjs';
import { MotionManagerCommandDto } from './dto/motion-manager.command.dto'
import { MotionManagerSettingsDto } from './dto/motion-manager.settings.dto';
import { MotionManagerScriptDto } from './dto/motion-manager.script.dto';

@Injectable()
export class MotionManagerService {
    constructor(private readonly httpService: HttpService) {}

    timerSubscription: Subscription;

    settings = {
        valid: [],
        script: [],
        lightURL: '',
        repeat: 0,
        status: 'stop',
        timerDuration: 20000
    }

    logs = {
        log: []
    }

    // Delay call to provide wait time for scripts
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    status(): String {
        console.log("*** motion-manager status");
        return "checking";
    }

    log() {
        console.log("*** motion-manager log");
        return this.logs;
    }

    // return the automation script
    getScript(): any {
        console.log("*** motion-manager getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // start the script and return immediately
    start(): any {
        console.log("*** motion-manager start");
        this.runScript();
        return true;
    }

    // Run the script commands
    runScript() {
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
            }
        }
    }

    // Settings sent to device
    async deviceSettings(settings: MotionManagerSettingsDto): Promise<boolean> {
        console.log("*** motion-manager deviceSettings:", settings);
        this.settings.lightURL = settings.lightURL;
        return true;
    }

    // Script for simulation
    async script(script: MotionManagerScriptDto): Promise<boolean> {
        console.log("*** motion-manager script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    async command(command: MotionManagerCommandDto): Promise<boolean> {
        console.log("*** motion-manager command:", command);
        let result = false;

        switch(command.action) {
            case 'Motion Detected':
                result = await this.turnOnLights();
                this.resetTimer();
                this.logs.log.push({time: Date.now(), action: 'Motion Detected'})
                break;
            default:
                console.log("*** Undefined action")
        }
        return result;
    }

    async turnOnLights(): Promise<boolean> {
        let result = false;
        if(this.settings.lightURL.length>0){
            console.log("Call to turn on light at: ", this.settings.lightURL);
            console.log("Send: ", {action: "on"})

            const requestConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const dataSend = {action: "on"}

            const responseData = await lastValueFrom(
                this.httpService.post(this.settings.lightURL, dataSend, requestConfig).pipe(
                    map((response) => {
                        return response.data;
                    }),
                ),
            );
            console.log("From POST call: ", responseData);
            result = true;
        }
        else {
            console.log("lightURL - URL not in settings")
        }
        return result;
    }

    async turnOffLights(): Promise<boolean> {
        let result = false;
        if(this.settings.lightURL.length>0){
            console.log("Call to turn off light at: ", this.settings.lightURL);
            console.log("Send: ", {action: "off"})

            const requestConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const dataSend = {action: "off"}

            const responseData = await lastValueFrom(
                this.httpService.post(this.settings.lightURL, dataSend, requestConfig).pipe(
                    map((response) => {
                        return response.data;
                    }),
                ),
            );
            console.log("From POST call: ", responseData);
            result = true;
        }
        else {
            console.log("lightURL - URL not in settings")
        }
        return result;
    }

    startTimer(): void {
        // Start the timer
        this.timerSubscription = timer(this.settings.timerDuration).pipe(
            map(() => {
                // When the timer expires, turn off the lights
                return this.turnOffLights();
            })
        ).subscribe();
    }

    resetTimer(): void {
        // Reset the timer
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        this.startTimer();
    }
}



