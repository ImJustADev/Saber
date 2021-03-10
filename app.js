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
const mongo = require('./data/mongo.js')
const guildSchema = require('./Schemas/guildSchema.js');
const userSchema = require('./Schemas/userSchema.js');

const build = npm.version;
const author = npm.author;
const about = npm.description;
const depends = npm.dependencies;
const homepage = npm.homepage;

const prefix = config.BOT_PREFIX;
const db_prefix = config.DB_PREFIX;
const mongoPath = config.MONGO_DB;

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

    switch (client.user.username) {
        case "Saber":
            new Logger("Logged in as " + c5 + "Saber The Tiger");
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

        /*
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
                    value: client.guilds.cache.size,
                    inline: true
                }
                ],
                footer: {
                    text: "This message was automatically generated because an instance of SaberBot was started. This message is intended for development and debugging purposes and should only appear in a specific server."
                }
            }
        });
        */
    } else if (process.env.USER == "Saber") {
        console.log("Compilation successful! Exiting with code 0.");
        process.exit(0);
    }
    //new PostToDB(client);


});

client.on('message', async msg => {

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
                    msg.channel.send("I am current serving `" + client.guilds.cache.size + "` guilds.");
                    //new UpdateGuilds(client.guilds.size);
                }
                else if (input.startsWith("newuser")) {
                    msg.delete();
                    await mongo().then(async (mongoose) => {
                        try {
                            new Logger(db_prefix + c2 + "Atempting to create a new User Profile for User " + msg.author.username + "...");
                            await new userSchema({
                                "_id": msg.member.id,
                                "discord": msg.member.displayName,
                                "userID": msg.member.id,
                                "userTag": msg.member.user.tag,
                                "xp": 0,
                                "level": 1,
                                "rank": 0,
                                "preferences": [],
                                "nickname": null,
                                "switchFriends": [],
                                "switchCode": null,
                                "switchPrivacy": "PUBLIC",
                                "twitter": null,
                                "youtube": null,
                                "spotify": null,
                                "steam": null,
                                "twitch": null,
                                "telegram": null,
                                "hasSubscription": false,
                                "hasSmash": false,
                                "playtime": 0,
                                "wins": 0,
                                "losses": 0,
                                "kills": 0,
                                "deaths": 0,
                                "kdr": 0,
                                "mains": [],
                                "stages": [],
                                "counter_picks": [],
                                "rule_set": [],
                                "p_chars": [],
                                "p_stages": [],
                                "p_region": [],
                                "p_prefs": []
                            }).save();
                        } finally {
                            if (!input[1]) {
                                msg.channel.send(":white_check_mark:  Hey <@" + msg.member.id + ">! Your Profile Account Setup for was successful! Type " + prefix + "profile to view your profile");
                            }
                            else {
                                msg.channel.send(":white_check_mark:  Profile Account Setup for <@" + msg.member.id + "> was successful! Type " + prefix + "profile " + msg.member.displayName + " to view their profile");

                            }
                        }
                        new Logger(db_prefix + c2 + "Successfully created new user Index with id: " + msg.author.id);
                        mongoose.connection.close()

                    })
                }
            }
        } catch (e) {
            console.log(e);
        }
});

client.on('guildCreate', async guild => {
    await mongo().then(async (mongoose) => {
        try {
            new Logger(db_prefix + c2 + "A new guild was created! Attempting to put data into MongoDB...");
            await new guildSchema({
                "_id": guild.id,
                "guildID": guild.id,
                "name": guild.name,
                "owner": guild.ownerID,
            }).save();
            new Logger(db_prefix + c2 + "Guild: " + guild.name);
            new Logger(db_prefix + c2 + "Guild ID: " + guild.id);
            new Logger(db_prefix + c2 + "Owner: " + guild.ownerID);
        } finally {
            new Logger(db_prefix + c2 + "Successfully created new index for guild with id: " + guild.id);
            mongoose.connection.close()
        }
    })
});

client.on('guildDelete', async guild => {
    await mongo().then(async (mongoose) => {
        try {
            new Logger(c5 + db_prefix + c2 + "SaberBot was removed from a guild... Removing from MongoDB:");
            new Logger(c5 + db_prefix + c2 + "Guild: " + guild.name);
            new Logger(c5 + db_prefix + c2 + "Guild ID: " + guild.id);
            new Logger(c5 + db_prefix + c2 + "Owner: " + guild.ownerID);

            await new guildSchema({
                "_id": guild.id,
                "guildID": guild.id,
                "name": guild.name,
                "owner": guild.ownerID,
            }).deleteOne();
        } finally {
            new Logger(c5 + db_prefix + c2 + "Successfully removed entry with index " + guild.id);
            mongoose.connection.close()
        }
    })
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
