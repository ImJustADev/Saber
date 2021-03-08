const User = require('./User.js');
const Channel = require('./Channel.js');

var identifier = -1;
var type = "DEFAULT";
var content = "";
var author;
var pinned = false;
var tts = false;
var channel;

class Message {
    constructor(message) {
        content = message;
        channel = new Channel();
        author = new User();
    }

    get content() {
        return content;
    }

    get id() {
        return identifier;
    }

    get author() {
        return author;
    }

    get channel() {
        return channel;
    }

    //method
    reply(content) {
        //nothing
    }
}

module.exports = Message;