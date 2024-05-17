import { Injectable } from '@nestjs/common';
import { LightCommandDto } from './dto/light.command.dto';
import { LightScriptDto } from './dto/light.script.dto';
import { LightSettingsDto } from './dto/light.settings.dto';

@Injectable()
export class LightService {
    constructor() {}

    // Internal settings
    settings = {
        script: [],
        repeat: 0,
        on: false
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
        console.log("*** light status");
        return (this.settings.on) ? "Light ON" : "Light OFF";
    }

    // Return the data in the log
    log() {
        console.log("*** light log");
        return this.logs
    }

    // Return the script
    getScript(): any {
        console.log("*** light getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // Turns on light
    lightOn(): boolean {
        this.settings.on = true;
        console.log("*** light turned ON");
        return true;
    }

    // Turns off light
    lightOff():boolean {
        this.settings.on = false;
        console.log("*** light turned OFF");
        return false;
    }

    // Settings sent to device 
    async deviceSettings(settings: LightSettingsDto): Promise<boolean> {
        console.log("*** light deviceSettings:", settings);
        return true;
    }

    // Script for simulation
    async script(script: LightScriptDto): Promise<boolean> {
        console.log("*** card-manager script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    // Start the script and return
    start(): any {
        console.log("*** light turned ON");
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
                await this.command(this.settings.script[j]);
                // Wait specified number of seconds
                await this.delay(this.settings.script[j].delay * 1000);
            }
        }
    }

    // receives action (on/off) from motion-manager
    async command(action: LightCommandDto): Promise<boolean> {
        console.log("*** light command:", action);
        let result = false;

        switch(action.action) {
            case 'on':
                this.lightOn();
                this.logs.log.push({time: Date.now(), action: 'on'})
                result = true;
                break;
            case 'off':
                this.lightOff();
                this.logs.log.push({time: Date.now(), action: 'off'})
                result = true;
                break;
            default:
                console.log("*** Undefined action");
                result = false;
        }
        return result;
    }
}

