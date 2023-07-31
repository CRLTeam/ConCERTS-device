# for this example
# card-reader  192.168.2.235:3000
# card-manager 192.168.2.234:3000
# door-lock    192.168.2.248:3000

# Set the card-reader to use the command interface of the card-manager
curl -X 'POST' \
  'http://192.168.2.235:3000/card-reader/settings' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "controllerUrl": "http://192.168.2.234:3000/card-manager/command"
}'

# Set the script for the card reader to swipe 2 cards, a valid and invalid card
curl -X 'POST' \
  'http://192.168.2.235:3000/card-reader/script' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "script": [
    {
      "action": "swipe",
      "card": 123,
      "delay": 5
    },
    {
      "action": "swipe",
      "card": 321,
      "delay": 10
    }
  ],
  "repeat": 5
}'

# Set the card-manager list of valid cards and command interface of door lock
curl -X 'POST' \
  'http://192.168.2.234:3000/card-manager/settings' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "valid": [
    123,
    1234,
    124
  ],
  "lockURL": "http://192.168.2.248:3000/door-lock/command"
}'

# Start the script on the card reader
curl -X 'GET' \
  'http://192.168.2.235:3000/card-reader/start' \
  -H 'accept: */*'