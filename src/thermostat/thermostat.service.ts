import { Injectable } from '@nestjs/common';
//import { I2C } from 'raspi-i2c';
import { catchError, map, lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ThermostatCommandDto } from './dto/thermostat.command.dto'
import { ThermostatSettingsDto } from './dto/thermostat.settings.dto'
import { ThermostatScriptDto } from './dto/thermostat.script.dto'

const i2c = require('i2c-bus');

@Injectable()
export class ThermostatService {
    constructor(private readonly httpService: HttpService) {}

    //private static i2c: I2C = new I2C();
    private i2cBus = i2c.openSync(1); // 1 for pi
    private simTemp: number = 0;

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
        let temp = 0;
        
        try {
            //temp = ThermostatService.i2c.readByteSync(0x48);
            //temp = ThermostatService.i2c.readByteSync(0x48);
            const address = 0x48;
            const buffer = Buffer.alloc(2);
            this.i2cBus.readI2cBlockSync(address, 0x00, buffer.length, buffer);
            temp = this.makeCelcuis(buffer.readInt16BE());
            console.log("Temperature device: temp=\x1b[40m", temp, "\x1b[47m"); // Read one byte from the AD Converter using i2c
        }
        catch(error) {
            console.log("No device, use simulation=", this.simTemp)
            temp = this.simTemp;
        }
 

        console.log("*** card-reader status");
        return "Temperature is "+temp.toString();
    }   

    makeCelcuis(data: number): number {
        let Vr = 5 * data / 255
		let Rt = 10000 * Vr / (5 - Vr)
		let temp = 1/(((Math.log(Rt / 10000)) / 3950) + (1 / (273.15+25)))
		temp = temp - 273.15
        temp = Math.round(temp * 100) / 100
        return temp
    }

    // return the data in the log
    log(): any {
        console.log("*** Thermostat log");
        return this.logs;
    }

    getScript(): any {
        console.log("*** Thermostat getScript");
        return { script: this.settings.script, repeat: this.settings.repeat };
    }

    // start the script and return
    start(): any {
        console.log("*** Thermostat start");
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
    async deviceSettings(settings: ThermostatSettingsDto): Promise<boolean> {
        console.log("*** Thermostat deviceSettings:", settings);
        let result = false;
        if(settings.controllerUrl.length>0) {
            // set the internal settings with the passed in parameter
            this.settings.controllerURL = settings.controllerUrl;
            result = true;
        }
        return result;
    }

    // Script for simulation
    async script(script: ThermostatScriptDto): Promise<boolean> {
        console.log("*** Thermostat script:", script);
        this.settings.script = script.script;
        this.settings.repeat = script.repeat;
        return true;
    }

    // Command sent to device to simulate a trigger
    async command(action: ThermostatCommandDto): Promise<boolean> {
        console.log("*** Thermostat command:", action);
        let result = false;

        // Check action
        switch(action.action) {
            case 'temperature':
                // Send temperature to controller
                result = await this.sendTemperature(action.celcius);
                // Record swipe in log
                this.logs.log.push({time: Date.now(), action: 'temperature', celcius: action.celcius})
                break;
            default:
                console.log("*** Undefined action");
        }
        return result;
    }

    async sendTemperature(celcius: number): Promise<boolean> {
        console.log("*** Thermostat sendTemperature:", celcius);
        let result = false;
        // Only make the call if the URL is set
        if(this.settings.controllerURL.length>0) {
            console.log("Send: ", {action: "temperature", celcius: celcius})
            console.log("Send to: ", this.settings.controllerURL)

            const requestConfig = {
                headers: {
                  'Content-Type': 'application/json'
                }
            };

            const dataSend = {action: "temperature", celcius: celcius}
              
            const responseData = await lastValueFrom(
                this.httpService.post(this.settings.controllerURL, dataSend, requestConfig).pipe(
                  map((response) => {
                    return response.data;
                  }),
                ),
            );
            console.log("From POST call:", responseData);

        }
        else {
            console.log("sendTemperature - URL not in settings")
        }

        return result;
    }    
}
