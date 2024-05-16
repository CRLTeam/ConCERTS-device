## REST Calls for card-reader, card-manager and door-lock

| Call                            | Description                                                  | Parameters                                                   |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| POST /**card-reader**/settings  | Set the address of the card manager                          | { "controllerUrl": "http://localhost:3000/card-manager/command" } |
| POST /**card-reader**/command   | Run a card swipe                                             | { "action": "swipe","card": 1234 }          |
| POST /**card-reader**/script    | Set the script for simulation                                | { "script": { "action": "swipe", "card": 123, "delay": 5}, { "action": "swipe", "card": 321, "delay": 10 }], "repeat": } |
| GET /**card-reader**/start      | Start the simulation script                                  |                                                              |
| GET /**card-reader**/log        | Get the log file of activity                                 |                                                              |
| POST /**card-manager**/settings | Set the whitelist of card number and the address of the door lock | { "valid": [ 1234, 1235, 1236  ], "lockURL": "http://localhost:3000/door-lock/command" } |
| POST /**card-manager**/command  | Check a card number                                          | { "action": "check", "cardId": 1234 }        |
| POST /**card-manager**/script   | Set the script for simulation                                | { "script": [{ "action": "check", "cardId": 1234, "delay": 10 }, { "action": "check", "cardId": 4321,  "delay": 20 }], "repeat": 2} |
| GET /**door-lock**/start        | Start the simulation script                                  |                                                              |
| GET /**door-lock**/log          | Get the log file of activity                                 |                                                              |
| POST /**door-lock**/settings    | Turn on or off door lock buzzer sound                        | { "buzz": "true" }                                 |
| POST /**door-lock**/command     | Open the lock                                                | { "action": "open", "wait": 5 }              |
| POST /**door-lock**/script      | Set the script for simulation                                | { "script": [{ "action": "open", "wait": 5, "delay": 10 }, { "action": "open", "wait": 5, "delay": 20 }], "repeat": 2 } |
| GET /**door-lock**/start        | Start the simulation script                                  |                                                              |
| GET /**door-lock**/log          | Get the log file of activity                                 |                                                              |
