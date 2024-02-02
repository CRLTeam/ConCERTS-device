import { Injectable } from '@nestjs/common';
import { Gpio } from 'onoff';
import { HttpService } from '@nestjs/axios';
import { AirconditionerCommandDto } from './dto/airconditioner.command.dto'
import { AirconditionerSettingsDto } from './dto/airconditioner.settings.dto'
import { AirconditionerScriptDto } from './dto/airconditioner.script.dto'

@Injectable()
export class AirconditionerService {
    constructor(private readonly httpService: HttpService) {}

    private static led = new Gpio(18, 'out');
    private switchPosition = 'OFF';

    // Internal settings
    settings = {
        controllerURL: '',
        script: [],
        repeat: 0,
        status: 'stop'
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
       
        console.log("*** Air Conditioner status");
        return "Air Conditioner is " + this.switchPosition;
    }   
    
    // return the data in the log
    log(): any {
        console.log("*** Air Conditioner log");
        return this.logs;
    }

    getScript(): any {
        console.log("*** Air Conditioner getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // start the script and return
    start(): any {
        console.log("*** Air Conditioner start");
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

    // Settings sent to device 
    async deviceSettings(settings: AirconditionerSettingsDto): Promise<boolean> {
        console.log("*** Air Conditioner deviceSettings:", settings);
        let result = false;
        if(settings.controllerUrl.length>0) {
            // set the internal settings with the passed in parameter
            this.settings.controllerURL = settings.controllerUrl;
            result = true;
        }
        return result;
    }

    // Script for simulation
    async script(script: AirconditionerScriptDto): Promise<boolean> {
        console.log("*** Air Conditioner script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    // Command sent to device to simulate a trigger
    async command(action: AirconditionerCommandDto): Promise<boolean> {
        console.log("*** Air Conditioner command:", action);
        let result = false;

        // Check action
        switch(action.action) {
            case 'switch':
                // Flip switch to on or off position
                try {
                    AirconditionerService.led.writeSync(action.value?1:0)
                    console.log("Air Conditioner ", action.value?'ON':'OFF'); 
                }
                catch(error) {
                    console.log("No device, use simulation")
                }

                this.switchPosition =  action.value?'ON':'OFF';
        
                // Record swipe in log
                this.logs.log.push({time: Date.now(), action: 'switch', value: action.value})
                break;
            default:
                console.log("*** Undefined action");
        }
        return result;
    }
}