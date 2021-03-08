const Command = require('../commands/Command.js');
const Logger = require('../utils/Logger.s');

class CreateUser extends Command {
    constructor(msg, db) {
        super(msg);
        db.collection('users').insertOne({

            _id: msg.author.id,
            switchCode: "-1",
            switchPrviacy: "PUBLIC",
            ssbmain: "-1",

        }, function (error, response) {
            if (error) {
                new Logger(RED + "Failed to add user " + msg.author.id + " to the database!" + RESET);
            } else {
                new Logger(GREEN + "User " + msg.author.id + " was added to the database successfully!" + RESET);
            }
        });
    }
}

module.exports = CreateUser;