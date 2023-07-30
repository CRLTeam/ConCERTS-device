import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { tap, map } from 'rxjs';
import { DoorLockCommandDto } from './dto/door-lock.command.dto'
import { DoorLockSettingsDto } from './dto/door-lock.settings.dto'
import { DoorLockScriptDto } from './dto/door-lock.script.dto'

@Injectable()
export class DoorLockService {
    constructor(private readonly httpService: HttpService) {}

    // Internal settings
    settings = {
        buzz: "false",
        locked: true,
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
        console.log("*** door-lock status");
        return (this.settings.locked) ? "Locked" : "Unlocked";
    }

    // return the data in the log
    log(): any {
        console.log("*** door-lock log");
        return this.logs;
    }

    getScript(): any {
        console.log("*** door-lock getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // start the script and return
    start(): any {
        console.log("*** door-lock start");
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

    // Settings sent to device 
    async deviceSettings(settings: DoorLockSettingsDto): Promise<boolean> {
        console.log("*** door-lock deviceSettings:", settings);
        // set the internal settings with the passed in parameter
        this.settings.buzz = settings.buzz;
        return true;
    }

    // Script for simulation
    async script(script: DoorLockScriptDto): Promise<boolean> {
        console.log("*** door-lock script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    // Command sent to device to simulate a trigger
    async command(action: DoorLockCommandDto): Promise<boolean> {
        console.log("*** door-lock command:", action);
        let result = false;

        // Check action
        switch(action.action) {
            case 'open':
                // Send unlock to controller
                result = await this.unlock(action.wait);
                // Record swipe in log
                this.logs.log.push({time: Date.now(), action: 'open', delay: action.wait})
                break;
            default:
                console.log("*** Undefined action");
        }
        return result;
    }

    async unlock(delay: number): Promise<boolean> {
        console.log("*** door-lock unlock:", delay);
        console.log("Unlocked");
        this.settings.locked = false;
        await this.delay(delay * 1000);
        console.log("Locked");
        this.settings.locked = true;
        return true;
    }
}
