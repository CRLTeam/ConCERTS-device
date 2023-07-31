import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { tap, map } from 'rxjs';
import { CardManagerCommandDto } from './dto/card-manager.command.dto'
import { CardManagerSettingsDto } from './dto/card-manager.settings.dto'
import { CardManagerScriptDto } from './dto/card-manager.script.dto'

@Injectable()
export class CardManagerService {
    constructor(private readonly httpService: HttpService) {}

    // Internal settings
    settings = {
        valid: [],
        script: [],
        lockURL: '',
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
        console.log("*** card-manager status");
        return "checking";
    }

    // return the data in the log
    log(): any {
        console.log("*** card-manager log");
        return this.logs;
    }

    // return the automation script
    getScript(): any {
        console.log("*** card-manager getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // start the script and return immediately
    start(): any {
        console.log("*** card-manager start");
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
    async deviceSettings(settings: CardManagerSettingsDto): Promise<boolean> {
        console.log("*** card-manager deviceSettings:", settings);
        // set the internal settings with the passed in parameter
        this.settings.valid = settings.valid;
        this.settings.lockURL = settings.lockURL;
        return true;
    }

    // Script for simulation
    async script(script: CardManagerScriptDto): Promise<boolean> {
        console.log("*** card-manager script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    // Command sent to device to simulate a trigger
    async command(command: CardManagerCommandDto): Promise<boolean> {
        console.log("*** card-manager command:", command);
        let result = false;

        // Check action
        switch(command.action) {
            case 'check':
                // Send unlock to controller
                result = await this.check(command.cardId);
                // Record swipe in log
                this.logs.log.push({time: Date.now(), action: 'check', cardId: command.cardId})
                break;
            default:
                console.log("*** Undefined action");
        }
        return result;
    }

    async check(cardId: number): Promise<boolean> {
        console.log("*** card-manager check:", cardId);
        let result = false;
        if(this.settings.valid.includes(cardId)) {
            console.log("Card number is valid");
            // Only make the call if the URL is set
            if(this.settings.lockURL.length>0) {
                console.log("Call to open lock at: ", this.settings.lockURL);
                this.httpService.post(this.settings.lockURL, {action: 'open', wait: 5}).pipe(
                    tap((resp) => console.log(resp)),
                    map((resp) => resp.data),
                    tap((data) =>  console.log(data)),
                );
                result = true;
            }
            else {
                console.log("lockURL - URL not in settings")
            }            
        }
        return result;
    }
}
