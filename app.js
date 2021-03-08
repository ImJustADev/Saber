const Discord = require('discord.js');

const bot = new Discord.Client();

const Logger = require('./utils/Logger.js');
const Coin = require('./commands/Coin.js');
const Color = require('./utils/Color.js');
const ServerInfo = require('./commands/ServerInfo.js');
const RoleMenu = require('./commands/RoleMenu.js');
const PurgeChannel = require('./commands/PurgeChannel.js');
const Profile = require('./commands/Profile.js');
const Roles = require('./commands/Roles.js');
const Help = require('./commands/Help.js');

var config = require('./config.json');
var npm = require('./package.json');

const build = npm.version;
const author = npm.author;
const about = npm.description;
const depends = npm.dependencies;
const homepage = npm.homepage;

const prefix = config.BOT_PREFIX;

const indents = config.CONSOLE_NL_SIZE;
const header = config.CONSOLE_HEADER;
const h_symbol = config.CONSOLE_HEADER_SYMBOL;
const h_num = config.CONSOLE_HEADER_SIZE;
const color = config.EMBED_COLOR;
const c1 = Color.colorCodes.GREEN;
const c2 = Color.colorCodes.RESET;
const c3 = Color.colorCodes.BLUE;
const c4 = Color.colorCodes.YELLOW;
const c5 = Color.colorCodes.RED;

const memberRole = config.MEMBER_ROLE_ID;
const fighterRole = config.FIGHTERS_ROLE_ID;

const welcome = config.WELCOME_CHANNEL_ID; // #welcome

bot.on('ready', () => {

    console.log("\n".repeat(indents) + c2 + h_symbol.repeat(h_num) + header + h_symbol.repeat(h_num) + c2);
    console.log("About: " + c3 + about + c2);
    console.log("Depends: " + c3 + JSON.stringify(depends, null, 0) + c2);
    console.log("Homepage: " + c3 + homepage + c2);
    console.log("Build: " + c1 + build + c2);
    console.log("Author: " + c1 + author + c2 + "\nStartup Process " + c1 + "initialized" + c2 + "...");
    console.log(h_symbol.repeat((2*(h_num) + 13)));

    new Logger("Setting User Presence...");
    bot.user.setPresence({
        activity: {
            name: 'Feline Mrowr', 
        },  status: 'online',
    })
        .then(  
            new Logger("Result activity " + c2 + "Feline Mrowr"),
            new Logger("Result status " + c2 + bot.user.presence.status)
            )
        .catch(console.error);

    new Logger("Start-up process finished with 0 error(s)");
    switch (bot.user.username) {
        case "Saber":
            new Logger("Logged in as " + c2 + "Saber The Tiger");
            break;
        default:
            new Logger("Logged in as " + c2 + bot.user.username);
            break;
    }

});

    bot.on('message', msg => {

        if (msg.content)

            try {
                if (msg.content.toLowerCase().startsWith(prefix) && msg.author.bot != true) {
                    var input = msg.content.toLowerCase().substring(prefix.length);

                    if (input.startsWith("help")) {
                        new Help(msg);
                    }
                    else if (input == "github") {
                        msg.channel.send({
                            embed: {
                                author: {
                                    name: "GitHub",
                                    icon_url: "https://raw.githubusercontent.com/ImJustADev/Saber/main/misc/github-favicon.png",
                                },
                                title: "Saber",
                                url: "https://github.com/imjustadev/Saber/",
                                color: color,
                                description: "Bot Version: **" + build + "**\n\nView the original project source code here\nfor SaberBot\n\nAuthor: BlazeTheSnep\nDiscord: Blaze#0069\nTwitter: @BlazeTheSnep",
                            }
                        });
                    }

                    //clean code to map<> (2/28/2021) (Blaze)

                    else if (input.startsWith("roles")) {
                        new Roles(msg);
                    }
                    else if (input.startsWith("rm")) {
                        new RoleMenu(msg);
                    }
                    else if (input.startsWith("purge")) {
                        new PurgeChannel(msg);
                    }
                    else if (input.startsWith("profile")) {
                        new Profile(msg);
                    }
                    else if (input == "coin" || input == "c") {
                        new Coin(msg);
                    }
                    else if (input.startsWith("serverinfo")) {
                        new ServerInfo(msg);
                    }

                }
            } catch (e) {
                console.log(e);
            }
    });

    bot.on("guildMemberAdd", member => {
        const channel = bot.channels.fetch(welcome)
        var timestamp = msg.member.joinedAt;
        var u_month = timestamp.getMonth();
        var u_day = timestamp.getDate();
        var u_year = timestamp.getFullYear();
        var joined = u_month + "/" + u_day + "/" + u_year; 

        msg.channel.send(
            {
                embed: {
                    author: {
                        name: "A new user has joined the discord server!",
                        "icon_url": "https://cdn.discordapp.com/attachments/816877389018824704/816878422524559401/orange.png"
                    },
                    thumbnail: {
                        "url": msg.author.avatarURL()
                    },
                    title: "NOTE: This is an 18+ ONLY Server",
                    Color: Color,
                    description: "Welcome to Gecko Paradise **" + msg.author.username + "**\nWe hope you enjoy your stay here!\nFeel free to assign roles in <#814179912780087318>",
                    footer: {
                        text: "Timestamp: " + joined
                    },

                }

            });

            msg.member.roles.add(memberRole).catch(console.error);
            msg.member.roles.add(fighterRole).catch(console.error);
    });

    if (process.env.TOKEN != undefined) {
        bot.login(process.env.TOKEN);
    }
    else {
        bot.login(config.TOKEN);
    }