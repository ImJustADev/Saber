const Discord = require('discord.js');
const client = new Discord.Client();

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
const PostToDB = require('./databases/PostToDB.js');
const UpdateGuilds = require('./api/UpdateGuilds.js');
const DeleteUser = require('./commands/DeleteUser.js');

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
const logs = config.DEV_CHANNEL;
const c1 = Color.colorCodes.GREEN;
const c2 = Color.colorCodes.RESET;
const c3 = Color.colorCodes.BLUE;
const c4 = Color.colorCodes.YELLOW;
const c5 = Color.colorCodes.RED;

const welcome = config.WELCOME_CHANNEL_ID; // #welcome

client.on('ready', () => {

    console.log("\n".repeat(indents) + c2 + h_symbol.repeat(h_num) + header + h_symbol.repeat(h_num) + c2);
    console.log("About: " + c3 + about + c2);
    console.log("Depends: " + c3 + JSON.stringify(depends, null, 0) + c2);
    console.log("Homepage: " + c3 + homepage + c2);
    console.log("Build: " + c1 + build + c2);
    console.log("Author: " + c1 + author + c2 + "\nStartup Process " + c1 + "initialized" + c2 + "...");
    console.log(h_symbol.repeat((2 * (h_num) + 13)));

    new Logger("Setting User Presence...");
    client.user.setPresence({
        activity: {
            name: 'Feline Mrowr',
        }, status: 'online',
    })
        .then(
            new Logger("Result activity " + c2 + "Feline Mrowr"),
            new Logger("Result status " + c2 + client.user.presence.status)
        )
        .catch(console.error);

    new Logger("Start-up process finished with 0 error(s)");
    switch (client.user.username) {
        case "Saber":
            new Logger("Logged in as " + c2 + "Saber The Tiger");
            break;
        default:
            new Logger("Logged in as " + c2 + client.user.username);
    }


    client.options.messageCacheLifetime = 30;
    new Logger("Message Life time is set to " + client.options.messageCacheLifetime);
    client.options.messageSweepInterval = 45;
    new Logger("Message Sweep Interval is set to " + client.options.messageSweepInterval);

    if (client.user.id == config.CLIENT_ID) {
        new Logger("This instance is a live bot");
        new UpdateGuilds(client.guilds.size);
        new PostToDB(client);
        const DBL = require("dblapi.js");
        const dbl = new DBL(config.DBL_TOKEN, client);


        const redirect = client.channels.cache.find(i => i.name === config.DEV_CHANNEL);
        redirect.send({
            embed: {
                title: "Client Restarted!",
                color: color,
                fields: [{
                    name: "Build",
                    value: build,
                    inline: true
                }, {
                    name: "Guilds Serving",
                    value: client.guilds.size,
                    inline: true
                }
                ],
                footer: {
                    text: "This message was automatically generated because an instance of SaberBpt was started. This message is intended for development and debugging purposes and should only appear in a specific server."
                }
            }
        });
    } else if (process.env.USER == "BlazeTheSnep") {
        console.log("Compilation successful! Exiting with code 0.");
        process.exit(0);
    }

    //new PostToDB(client);


});

client.on('message', msg => {

    if (msg.content)

        try {
            if (msg.content.toLowerCase().startsWith(prefix) && msg.author.client != true) {
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
                            description: "client Version: **" + build + "**\n\nView the original project source code here\nfor SaberBot\n\nAuthor: BlazeTheSnep\nDiscord: Blaze#0069\nTwitter: @BlazeTheSnep",
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
                    new PurgeChannel(msg, client);
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
                else if (input == "guilds") {
                    msg.channel.send("I am current serving `" + client.guilds.size + "` guilds.");
                    new UpdateGuilds(client.guilds.size);
                }
                else if (input == "clear") {
                    new DeleteUser(msg);
                }

            }
        } catch (e) {
            console.log(e);
        }
});

client.on('guildCreate', guild => {
    new Logger("Guild Create was triggered");
    try {
        if (client.user.id == config.CLIENT_ID && guild.available) {
            var id = guild.id;
            try {
                const DBL = require("dblapi.js");
                const dbl = new DBL(config.DBL_TOKEN, client);
                new UpdateGuilds(client.guilds.size);
                new PostToDB(client);
            } catch (e) {
                console.log(e);
            } finally {

                /*
                const MongoClient = require('mongodb').MongoClient;
                const url = 'mongodb://localhost:27017';
                MongoClient.connect(url, function (err, client) {
                    var db = client.db('SaberBot');
                    db.collection('guilds').insertOne({
                        _id: id,
                        announcement_channel: null,
                        prefix: "s!"
                    }, function (err, res) {
                        if (err) {
                            console.log(err);
                            client.close();
                        } else {
                            console.log(res);
                            client.close();
                        }
                    });
                })
                */
            }
        }
    } catch (e) {
        console.log(e);
    }
});

client.on('guildDelete', guild => {
    new Logger("Guild Delete Triggered");
    new UpdateGuilds(client.guilds.size);
    const DBL = require("dblapi.js");
    const dbl = new DBL(config.DBL_TOKEN, client);
});

client.on('guildMemberAdd', member => {
    if (member.guild.id == config.GUILD_ID) {
        if (!(member.user.username.includes("discord.gg/"))) {
            var timestamp = member.joinedAt;
            var u_month = timestamp.getMonth();
            var u_day = timestamp.getDate();
            var u_year = timestamp.getFullYear();
            var joined = u_month + "/" + u_day + "/" + u_year;

            let channel = client.channels.cache.find(i => i.name === welcome);
            channel.send({
                embed: {
                    author: {
                        name: "Mrowr! I has found a new friend... ",
                    },
                    thumbnail: {
                        "url": member.user.avatarURL()
                    },
                    title: "\u200B",
                    color: color,
                    description: "Welcome to the server" + member.displayName + "\nWe hope you enjoy your stay here!\nFeel free to assign roles in <#814179912780087318>",
                    footer: {
                        text: "ID: " + member.id
                    },

                }

            });

            let role = member.guild.roles.cache.find(r => r.name === "Member");
            member.roles.add(role).catch(console.error);
        }
    }
});

if (process.env.TOKEN != undefined) {
    client.login(process.env.TOKEN);
}
else {
    client.login(config.TOKEN);
}