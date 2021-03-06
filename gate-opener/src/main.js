const express = require("express");
const exec = require("await-exec");
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.2.10');

const PORT = process.env.PORT || 8000;
const RECORDING_FILE = "record.iq";
const FREQUENCY = "433.9";
const CMD = `sudo ./sendiq -s 250000 -f "${FREQUENCY}"e6 -t u8 -i ${RECORDING_FILE} >/dev/null 2>/dev/null`;

var app = express();

app.get("/gate", async (req, res, next) => {
    try {
        console.log(`Running command: ${CMD}`);
        await exec(CMD);
        res.status(200).json({
            success: true,
            msg: "Radio signal transmitted successfully."
        });
    }
    catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "An error occured while running sendiq command.",
            error,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// MQTT

client.on('connect', function () {
    client.subscribe('rpi.open_gate', function (err) {
        if (!err) {

        }
    })
});

client.on('message', async function (topic, message) {
    if(topic === "rpi.open_gate") {
        try {
            console.log(`Running command from mqtt: ${CMD}`);
            await exec(CMD);
        } catch (error) {
            console.error(error);
        }
    }
});
