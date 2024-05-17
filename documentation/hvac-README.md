## REST Calls for thermostat, hvac-controller, airconditioner and furnace

| Call                            | Description                                                  | Parameters                                                   |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| POST /**thermostat**/settings  | Set the address of the HVAC controller                          | { "controllerUrl": "http://localhost:3000/hvac-controller/command" } |
| POST /**thermostat**/command   | Measure the temperature                                             | { "action": "temperature", "celsius": 25 }          |
| POST /**thermostat**/script    | Set the script for simulation                                | { "script": { "action": "temperature", "celcius": 25, "delay": 5 }, { "action": "temperature", "celcius": 26, "delay": 10 }], "repeat": } |
| GET /**thermostat**/start      | Start the simulation script                                  |                                                              |
| GET /**thermostat**/log        | Get the log file of activity                                 |                                                              |
| POST /**airconditioner**/settings | Set the address of the HVAC controller | { "controllerUrl": "http://localhost:3000/hvac-controller/command" } |
| POST /**airconditioner**/command  | Check a card number                                          | { "action": "switch", "value": 1 }        |
| POST /**airconditioner**/script   | Set the script for simulation                                | { "script": [{ "action": "switch", "value": 1, "delay": 5 }, { "action": "switch", "value": 0, "delay": 10 }], "repeat": 2} |
| GET /**airconditioner**/start        | Start the simulation script                                  |                                                              |
| GET /**airconditioner**/log          | Get the log file of activity                                 |                                                              |
| POST /**furnace**/settings    | Set the address of the HVAC Controller                        | { "controllerUrl": "http://localhost:3000/hvac-controller/command" }                                 |
| POST /**furnace**/command     | Open the lock                                                | { "action": "switch", "value": 1 }              |
| POST /**furnace**/script      | Set the script for simulation                                | { "script": [{ "action": "switch", "value": 1, "delay": 5 }, { "action": "switch", "value": 0, "delay": 10 }], "repeat": 2 } |
| GET /**furnace**/start        | Start the simulation script                                  |                                                              |
| GET /**furnace**/log          | Get the log file of activity                                 |                                                              |
