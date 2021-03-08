var config = require('../config.json');
const Color = require('../utils/Color.js');
const c1 = Color.colorCodes.YELLOW;
const c2 = Color.colorCodes.CYAN;
const c3 = Color.colorCodes.GREEN;
const reset = Color.colorCodes.RESET;

var prefix = config.CONSOLE_PREFIX;
var format = "";
var time;

class Logger {
    constructor(msg) {

            time = new Date().toLocaleTimeString();
            format = time + prefix + msg;
            console.log("[" + c1 + time + reset + "] [" + c2 + prefix + reset + "] " + c3 + msg + reset);

        }

        get contents() {
            return msg;
        }
}

module.exports = Logger;