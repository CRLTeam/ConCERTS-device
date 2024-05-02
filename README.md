## ConCERTS: An IoT Device activity simulator for building an IoT Cybersecurity Research Range

## Description

The repository holds the software required for simulating an IoT device. Each device has:

- Settings for devices
- Commands
- Log file of executed commands
- Activity simulation script

This version of the device simulator supports three types of devices:

1. Card Reader - a device that can simulate the swiping of a security card
2. Card Manager - a controller that compares the value of the card read with a whitelist of cards
3. Door Lock - a door lock that can lock and unlock a door

![Card Reader Pattern](https://github.com/CRLTeam/CONCerts-device/blob/main/documentation/CardReaderPattern.png?raw=true)

To simulate all three working together, you need to provide the settings for the card reader and door manager and then set the script for the card reader.  Running the card reader script will cascade the simulation to all of the devices.  See: start.sh script for automation of the simulation.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start:dev
```

## Swagger Interface

This software supports a swagger interface to view the REST API.

http://localhost:3000/api

## Device REST Calls

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



## Project Maintainer


## License

CONCerts is [MIT licensed](LICENSE).

