import { Injectable } from '@nestjs/common';


@Injectable()
export class ThermostatService {
    gpio = require('rpi-gpio').promise;


    // Response to /device call
    status(): String {
        this.gpio.on('change', function(channel, value) {
            console.log('Channel ' + channel + ' value is now ' + value);
        });
        this.gpio.setup(7, this.gpio.DIR_IN, this.gpio.EDGE_BOTH);
    

        console.log("*** card-reader status");
        return "Status";
    }    
}
