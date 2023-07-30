import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { CardReaderCommandDto } from './dto/card-reader.command.dto'
import { CardReaderSettingsDto } from './dto/card-reader.settings.dto'
import { CardReaderScriptDto } from './dto/card-reader.script.dto'

@Injectable()
export class CardReaderService {
    constructor(private readonly httpService: HttpService) {}

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
        console.log("*** card-reader status");
        return "Status";
    }

    // return the data in the log
    log(): any {
        console.log("*** card-reader log");
        return this.logs;
    }

    getScript(): any {
        console.log("*** card-reader getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // start the script and return
    start(): any {
        console.log("*** card-reader start");
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
    async deviceSettings(settings: CardReaderSettingsDto): Promise<boolean> {
        console.log("*** card-reader deviceSettings:", settings);
        let result = false;
        if(settings.controllerUrl.length>0) {
            // set the internal settings with the passed in parameter
            this.settings.controllerURL = settings.controllerUrl;
            result = true;
        }
        return result;
    }

    // Script for simulation
    async script(script: CardReaderScriptDto): Promise<boolean> {
        console.log("*** card-reader script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    // Command sent to device to simulate a trigger
    async command(action: CardReaderCommandDto): Promise<boolean> {
        console.log("*** card-reader command:", action);
        let result = false;

        // Check action
        switch(action.action) {
            case 'swipe':
                // Send swipe to controller
                result = await this.sendSwipe(action.card);
                // Record swipe in log
                this.logs.log.push({time: Date.now(), action: 'swipe', card: action.card})
                break;
            default:
                console.log("*** Undefined action");
        }
        return result;
    }

    async sendSwipe(card: number): Promise<boolean> {
        console.log("*** card-reader sendSwipe:", card);
        let result = false;
        // Only make the call if the URL is set
        if(this.settings.controllerURL.length>0) {
            console.log("Send: ", {action: "check", card: card})
            console.log("Send to: ", this.settings.controllerURL)
            this.httpService.post(this.settings.controllerURL, {action: "check", card: card}).pipe(
                catchError(e => {
                    console.log("### Error: ", e.response.data, e.response.status);
                }),
                map(resp => console.log("REST Response=",resp.data))
            );
        }
        else {
            console.log("sendSwipe - URL not in settings")
        }

        return result;
    }
}
