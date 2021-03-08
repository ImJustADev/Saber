var identifier = -1;
var username = "test";
var bot = false;

class User {
    constructor() {
        //blank
    }

    get id() {
        return identifier;
    }

    get username() {
        return username;
    }

    get author() {
        return username;
    }

    get avatarURL() {
        return "https://github.com/imjustadev/TreccoDev/blob/main/misc/default_icon.png";
    }
}

module.exports = User;