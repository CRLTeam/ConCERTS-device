import { Injectable } from '@nestjs/common';
import { Gpio } from 'pigpio';
import { catchError, map, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { FurnaceCommandDto } from './dto/furnace.command.dto'
import { FurnaceSettingsDto } from './dto/furnace.settings.dto'
import { FurnaceScriptDto } from './dto/furnace.script.dto'

@Injectable()
export class FurnaceService {
    constructor(private readonly httpService: HttpService) {}

    private static led = new Gpio(17, { mode: Gpio.OUTPUT });
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
       
        console.log("*** furnace status");
        return "Furnace is " + this.switchPosition;
    }   
    
    // return the data in the log
    log(): any {
        console.log("*** furnace log");
        return this.logs;
    }

    getScript(): any {
        console.log("*** furnace getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // start the script and return
    start(): any {
        console.log("*** furnace start");
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
    async deviceSettings(settings: FurnaceSettingsDto): Promise<boolean> {
        console.log("*** furnace deviceSettings:", settings);
        let result = false;
        if(settings.controllerUrl.length>0) {
            // set the internal settings with the passed in parameter
            this.settings.controllerURL = settings.controllerUrl;
            result = true;
        }
        return result;
    }

    // Script for simulation
    async script(script: FurnaceScriptDto): Promise<boolean> {
        console.log("*** furnace script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    // Command sent to device to simulate a trigger
    async command(action: FurnaceCommandDto): Promise<boolean> {
        console.log("*** Thermostat command:", action);
        let result = false;

        // Check action
        switch(action.action) {
            case 'switch':
                // Flip switch to on or off position
                try {
                    FurnaceService.led.digitalWrite(action.value?1:0)
                    console.log("Furnace ", action.value?'ON':'OFF'); 
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
