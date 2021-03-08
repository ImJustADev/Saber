const Discord = require('discord.js');
const bot = new Discord.Client();

//move options to config file later (2/28/2021) (Blaze)
const Logger = require('./utils/Logger.js');
const Coin = require('./commands/Coin.js');
const Color = require('./templates/Color.js');
const ServerInfo = require('./commands/ServerInfo.js');
const RoleMenu = require('./commands/RoleMenu.js');
const PurgeChannel = require('./commands/PurgeChannel.js');
const Profile = require('./commands/Profile.js');
const Roles = require('./commands/Roles.js');
const Help = require('./commands/Help.js');

var config = require('./config.json');
var npm = require('./package.json');

const build = npm.version;

const prefix = config.BOT_PREFIX;
const color = config.EMBED_COLOR;

const memberRole = config.MEMBER_ROLE_ID;
const fighterRole = config.FIGHTERS_ROLE_ID;

const welcome = config.WELCOME_CHANNEL_ID; // #welcome

bot.on('ready', () => {

    new Logger('Build ' + build);
    bot.user.setPresence({
        activity: { name: 'with Tail' }, status: 'online'
    })
        .then(console.log)
        .catch(console.error);

    new Logger(" Discord bot Status: SUCCESS..");
    switch (bot.user.username) {
        case "Trecco":
            new Logger(Color.colorCodes.GREEN + "Logged in as " + Color.colorCodes.WHITE + "Trecco" + Color.colorCodes.RESET);
            break;
        default:
            new Logger(Color.colorCodes.GREEN + "Logged in as " + Color.colorCodes.WHITE + bot.user.username);
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
                                    icon_url: "https://raw.githubusercontent.com/ImJustADev/TreccoDev/main/misc/github-favicon.png",
                                },
                                title: "Trecco The Gecko",
                                url: "https://github.com/imjustadev/TreccoDev/",
                                color: color,
                                description: "Bot Version: **" + build + "**\n\nView the original project source code here\nfor Trecco The Gecko Discord Bot\n\nAuthor: BlazeTheSnep\nDiscord: Blaze#0069\nTwitter: @BlazeTheSnep",
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
        const channel = this.bot.channels.fetch(welcome)
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
                    color: color,
                    description: "Welcome to Gecko Paradise **" + msg.author.username + "**\nWe hope you enjoy your stay here!\nFeel free to assign roles in <#814179912780087318>",
                    footer: {
                        text: "Timestamp: " + joined,
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