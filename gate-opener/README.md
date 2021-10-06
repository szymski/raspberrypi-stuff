Gate opener
===========

Gate opener is a very simple HTTP service for opening my parking lot gate using [rpitx](https://github.com/F5OEO/rpitx).
It's configured for my purposes, if you want to use it for yourself, you'll have to change a few parameters, like the frequency of the radio signal and server port. It can be used to open parking lot gates, garage doors and all other stuff that uses radio transmission.

### Usage

1. Record radio signal using rpitx rtlmenu with and RTL-SDR dongle and save it to `record.iq` file.
2. Connect a wire to GPIO pin 4 to act as an antenna.
3. Run the service using `npm start`. The server will start at port `8000`. You can change the port by setting the `PORT` environment variable.
4. Send HTTP GET request to `http://raspberrypi:8000/gate`. This command will run the `sendiq` command from rpitx.
5. Voila! If you did everything right, the gate will open!

### Home Assistant

I made this script to automate gate opening using Home Assistant.

To be able to call this service using Home Assistant, you have to add the following lines to your `configuration.yaml`:

```
rest_command:
  open_gate:
    url: "http://raspberrypi:8000/gate"
```
