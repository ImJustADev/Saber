var config = require('../config.json');
const Command = require('./Command.js');

const fs = require('fs');
const { GuildAuditLogs, Guild } = require('discord.js');
const encoder = 'utf8';

//Category: Embed Colors
const color = 0xFF9900; //orange (default)
const e_color = 0xFD0061; //red (error)
const g_color = 15823988; //green (success)

//Category: Ranges
const min = config.CMD_PURGE_MINIMUM; // min
const max = config.CMD_PURGE_MAXIMUM; // max

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
var welcome = config.WELCOME_CHANNEL_ID; // #welcome
var announcements = config.ANNOUNCEMENT_CHANNEL_ID; // #announcements
var changelog = config.CHANGELOG_CHANNEL_ID; // #changelog
var boosts = config.BOOSTS_CHANNEL_ID; // #boosts
var roles = config.ROLE_CHANNEL_ID; // #roles

//Category: Text Channels
var general = config.GENERAL_CHANNEL_ID; // #general
var bot_cmds = config.BOT_CMDS_CHANNEL_ID; // #bot-cmds

//Category: Voice Channels
var vc_1 = config.VC1_ID; // #vc-1
var vc_2 = config.VC2_ID; // #vc-2
var vc_afk = config.VCAFK_ID; // #vc-afk

//Category Arenas (Defaults Only)
var arena_1 = config.A1_ID; // #arena-1
var arena_2 = config.A2_ID; // #arena-2
var arena_3 = config.A3_ID; // #arena-3
var arena_4 = config.A4_ID; // #arena-4

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

const other_words = ["Robery", "Kidnap", "Hug", "Fruitcake", "Murder", "Octapus", "Hitman", "Stab", "Love", "Motivation", "AK-47", "Knife"];

class PurgeChannel extends Command {
    constructor(msg, client) {
        super(msg);

        var executor = msg.member.user.tag;
        var e_id = msg.author.id; 
        if ((msg.member.roles.cache.has(admin))) {
            if (msg.author.id === head_gecko_id) {

                try {

                    var input = msg.content.split(" ")[1]; //input

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
                                        msg.channel.send({
                                            embed: {
                                                author: {
                                                    name: obj[i][j].name,
                                                    "icon_url": "https://cdn.discordapp.com/attachments/816877389018824704/816878422524559401/orange.png"
                                                },
                                                title: obj[i][j].title,
                                                color: g_color,
                                                description: "\nMessages Affected: `" + input + "`\nExecuted By: `" + executor + "`\nUser ID: `" + e_id + "`\nChannel(s) Affected: `#" + msg.channel.name + "`\nTime: `" + msg.createdAt + "`\n\n",
                                                footer: {
                                                    "text": "\nTreccoTheGecko v1.0"
                                                }
                                            }
                                        }).then(msg => {
                                            msg.delete( {
                                                timeout: 5000
                                            })
                                        })
                                        .catch(console.error);
                
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
            else {
                msg.channel.send({
                    embed: {
                        author: {
                            name: "[ERR172] TreccoBot has detected an issue!",
                        },
                        title: "Reason ➔ Unauthorized User",
                        color: e_color,
                        description: "\n\nYou cannot execute this command!\nStaff have been notified of this event.\nIf this is bug, please contact an admin immediately.",
                    }
                });
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