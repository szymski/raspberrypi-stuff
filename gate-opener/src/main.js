const express = require("express");
const exec = require("await-exec");

const PORT = process.env.PORT || 8000;
const CMD = `sudo ./sendiq -s 250000 -f "433.9"e6 -t u8 -i record.iq >/dev/null 2>/dev/null`;

var app = express();

app.get("/gate", async (req, res, next) => {
    try {
        await exec(CMD)
        res.status(200).json({
            success: true,
            msg: "Radio signal transmitted successfully."
        });
    }
    catch(error) {
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