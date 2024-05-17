## REST Calls for motion-detector, motion-manager and light

| Call                            | Description                                                  | Parameters                                                   |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| POST /**motion-detector**/settings  | Set the address of the motion manager                          | { "controllerUrl": "http://localhost:3000/motion-manager/command" } |
| POST /**motion-detector**/command   | Detect motion                                             | { "action": "Motion Detected" }          |
| POST /**motion-detector**/script    | Set the script for simulation                                | { "script": { "action": "Motion Detected", "delay": 5 }, { "action": "Motion Detected", "delay": 10 }], "repeat": } |
| GET /**motion-detector**/log        | Get the log file of activity                                 |                                                              |
| GET /**motion-detector**/script        | Return the script                                 |                                                              |
| GET /**motion-detector**/logscript        | Generate and set the script from the log file                                 |                                                              |
| GET /**motion-detector**/start      | Start the simulation script                                  |                                                              |
| POST /**motion-manager**/settings | Set the address of the door lock | { "lightURL": "http://localhost:3000/light/command" } |
| POST /**motion-manager**/command  | Detect motion                                          | { "action": "Motion Detected" }        |
| POST /**motion-manager**/script   | Set the script for simulation                                | { "script": [{ "action": "Motion Detected", "delay": 5 }, { "action": "Motion Detected", "delay": 10 }], "repeat": 2} |
| GET /**motion-manager**/log        | Get the log file of activity                                 |                                                              |
| GET /**motion-manager**/script        | Return the script                                 |                                                              |
| GET /**motion-manager**/start      | Start the simulation script                                  |                                                              |
| POST /**light**/command     | Turn ON/OFF light                                               | { "action": "on" }              |
| POST /**light**/script      | Set the script for simulation                                | { "script": [{ "action": "on", "delay": 10 }, { "action": "off", "delay": 20 }], "repeat": 2 } |
| GET /**light**/log          | Get the log file of activity                                 |                                                              |
| GET /**light**/script        | Return the script                                  |                                                              |
| GET /**light**/start        | Start the simulation script                                  |                                                              |


