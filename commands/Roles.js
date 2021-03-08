var config = require('../config.json');
const Command = require('./Command.js');

const fs = require('fs');
const Logger = require('../utils/Logger');
const encoder = 'utf8';

const other_words = ["Robery", "Kidnap", "Hug", "Fruitcake", "Murder", "Octapus", "Hitman", "Stab", "Love", "Motivation", "AK-47", "Knife"];

//Category: Embed Colors
const color = 0xFF9900; //orange (default)
const e_color = 0xFD0061; //red (error)
const g_color = 0x008E44; //green (success)

//Category: Ranges
const min = config.FIGHTER_START_INDEX; // min
const max = config.FIGHTER_END_INDEX; // max

//Category: Roles
var guild_id = config.GUILD_ID; // Guild ID
var head_gecko = config.SELF; // Myself (Blaze#0069)
var head_gecko_id = config.SELF_ID; // Myself (Blaze) (ID)

var gecko = config.GECKO_ROLE_ID; // Gecko
var admin = config.ADMIN_ROLE_ID; // Admin
var mod = config.MOD_ROLE_ID; // Mod
var friend = config.FRIEND_ROLE_ID; // Friend

//Category: Development
var docs = config.DOCUMENTATION_CHANNEL_ID; // #documentation
var templates = config.TEMPLATES_CHANNEL_ID; // #templates
var response = config.RESPONSE_CHANNEL_ID; // #response
var format = config.FORMAT_CHANNEL_ID; // #format

//Category: Important
const welcome = config.WELCOME_CHANNEL_ID; // #welcome
var announcements = config.ANNOUNCEMENT_CHANNEL_ID; // #announcements
var changelog = config.CHANGELOG_CHANNEL_ID; // #changelog
var boosts = config.BOOSTS_CHANNEL_ID; // #boosts
var roles = config.ROLE_CHANNEL_ID; // #roles

//Category: Text Channels
var general = config.GENERAL_CHANNEL_ID; // #general
var bot_cmds = config.BOT_CMDS_CHANNEL_ID; // #bot-cmds

var ignore = new Map([

    //Category: Development
    [1, 'docs'],
    [2, 'templates'],
    [3, 'response'],

    //Category: Important
    [4, 'welcome'],
    [5, 'announcements'],
    [6, 'changelog'],
    [7, 'boosts']

]);


// Fighter Variables

var fName; // property.DISPLAY_NAME
var fID; // property.ID
var fDLC; // property.IS_DLC
var fRole; // property.ROLE_ID

class Roles extends Command {
    constructor(msg, client) {
        super(msg);

        if (msg.guild.id == guild_id) {
            try {

                var input = msg.content.split(" ")[1];
                //new Logger("Your Input: " + input);

                /*
                if (input.startsWith("g!")) {
                    input = input.substring(2);
                }
                */

                var found = false;
                fs.readFile('./commands/templates/f_data.json', encoder, function (err, data) {
                    if (err) throw err;
                    var obj = JSON.parse(data);
                    for (var i = 0; i < obj.length; i++) {
                        for (var j = 0; j < obj[i].length; j++) {
                            var check = obj[i][j].DISPLAY_NAME;

                            //new Logger("Checking if " + check + " = " + input);

                            if (check == input) {
                                //new Logger("FOUND DATA ENTRY");

                                fName = obj[i][j].DISPLAY_NAME;
                                fID = obj[i][j].ID;
                                fDLC = obj[i][j].IS_DIC;
                                fRole = obj[i][j].ROLE_ID;

                                /*
                                new Logger("fName = " + fName);
                                new Logger("\nfId = " + toString(fID));
                                new Logger("\nfDLC = " + toString(fDLC));
                                new Logger("\nfRole = " + fRole);
                                */

                                found = true;
                                break;
                            }
                        }
                        //end of inner for loop
                    }

                    if (found == false) {

                        msg.channel.send({
                            embed: {
                                author: {
                                    name: "[ERROR] TreccoBot has detected an issue!",
                                },
                                title: "Reason ➔ Unknown Role",
                                color: e_color,
                                description: "\n\nYou must specify a valid Role.\nAll Roles are **CASE-SENSITIVE**\nIf this is bug, please contact an admin immediately.",
                            }
                        });
                    }

                    //add reaction to delete msg
                    else {
                        if (fRole != undefined) {
                            if (msg.member.roles.cache.has(fRole)) {

                                msg.member.roles.remove(fRole).catch(console.error);
                                msg.channel.send("You have removed the **" + fName + "** role from your profile.")

                            }


                            //Add
                            else {
                                msg.member.roles.add(fRole).catch(console.error);
                                msg.channel.send("You have added role **" + fName + "** to your profile.");
                            }
                        }

                    }
                });
            } catch (e) { }

        }
    }
}


module.exports = Roles;