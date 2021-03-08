class Logger {
    constructor(msg) {
        var time = new Date().toLocaleTimeString();
        console.log("[ GECKO ] [ " + time + " ] " + msg);
    }
}

module.exports = Logger;