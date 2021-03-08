var config = require('../config.json');
const Command = require('../api/Command.js');

const fs = require('fs');
const encoder = 'utf8';

//Category: Embed Colors
const color = 0xFF9900; //orange (default)
const e_color = 0xFD0061; //red (error)
const g_color = 15823988; //green (success)

//Category: Ranges
const min = config.CMD_PURGE_MINIMUM; // min
const max = config.CMD_PURGE_MAXIMUM; // max
const report = config.PURGE_LOG_CHANNEL;
var npm = require('../package.json');

const npm_ver = npm.version;
const npm_name = npm.name;

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

var i;
var j;
var k = 1; // 1
var l = 0; // 0
var m = 0; // 0
var lines = min;
var client;

const other_words = ["Robery", "Kidnap", "Hug", "Fruitcake", "Murder", "Octapus", "Hitman", "Stab", "Love", "Motivation", "AK-47", "Knife"];

class PurgeChannel extends Command {
    constructor(msg, client) {
        super(msg);
        
        const reportTo = client.channels.cache.find(i => i.name === report);
        var executor = msg.member.user.tag;
        var e_id = msg.author.id; 
        if ((msg.member.hasPermission("ADMINISTRATOR"))) {
                try {

                    var input = msg.content.split(" ")[1];

                    if ((parseInt(input) >= min) && (parseInt(input) <= max)) {

                        fs.readFile('./commands/templates/purge.json', encoder, function (e, data) {
                            if (e) throw err;
                            var obj = JSON.parse(data);

                            //counter check var
                            for (l = 0; l < ignore.length; l++) {
                                if (ignore.get(k) === msg.channel.name) {
                                    m++;
                                }
                                k++;
                            }

                        //not on blacklist
                            if (m == 0) {
                                
                                msg.channel.bulkDelete(input)
                                .catch(console.error);


                                  for (i = 0; i < obj.length; i++) {
                                    for (j = 0; j < obj[i].length; j++) {
                                        reportTo.send({
                                            embed: {
                                                author: {
                                                    name: obj[i][j].name,
                                                    "icon_url": "https://cdn.discordapp.com/attachments/816877389018824704/816878422524559401/orange.png"
                                                },
                                                title: obj[i][j].title,
                                                color: g_color,
                                                description: "\nMessages Affected: `" + input + "`\nExecuted By: `" + executor + "`\nUser ID: `" + e_id + "`\nChannel(s) Affected: `#" + msg.channel.name + "`\nTime: `" + msg.createdAt + "`\n\n",
                                                footer: {
                                                    "text": npm_name + " " + npm_ver
                                                }
                                            }
                                        })
                
                                    }
                                }
                            }
                            else {
                                msg.channel.send({
                                    embed: {
                                        author: {
                                            name: "[ERR174] TreccoBot has detected an issue!",
                                        },
                                        title: "Reason ➔ Blacklisted Field",
                                        color: e_color,
                                        description: "\n\nYou cannot execute this command!\non a blacklisted channel\nIf this is bug, please contact an admin immediately.",
                                    }
                                });
                            }
                        });
                    }
                    else {
                        msg.channel.send({
                            embed: {
                                author: {
                                    name: "[ERR175] TreccoBot has detected an issue!",
                                },
                                title: "Reason ➔ Out Of Bounds Error",
                                color: e_color,
                                description: "\n\nYou specified an invalid argument!\size must be between **" + min + "** and **" + max + "** to be considered valid.\nIf this is bug, please contact an admin immediately.",
                            }
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
        }

        //Invalid Permissions
        else {
            msg.channel.send({
                embed: {
                    author: {
                        name: "[ERR171] TreccoBot has detected an issue!",
                    },
                    title: "Reason ➔ Missing Permission Node(s)",
                    color: e_color,
                    description: "\n\nYou can't execute this command.\nYou are missing node \"" + "*mongodb.blazethesnep.trecco.auth.admin*\"" + "\nIf this is bug, please contact an admin immediately.",
                }
            });
        }
    }
    catch(e) {
        console.log(e);
    }

}


module.exports = PurgeChannel;