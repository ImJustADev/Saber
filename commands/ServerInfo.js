const Command = require('../api/Command.js');
const color = 0xFF9900;

class ServerInfo extends Command {
  constructor(msg) {
    super(msg);
    // Roles and IDs
    // Channels
    try {
      var mGuild = msg.guild;
      if (mGuild.available == true) {
        msg.channel.send({
          embed: {
            title: mGuild.name,
            color: color,
            fields: [
              {
                name: "Region",
                value: mGuild.region,
                inline: true
              },
              {
                name: "Owner",
                value: mGuild.owner.user.tag,
                inline: true
              },
              {
                name: "Server ID",
                value: mGuild.id,
                inline: true
              }
            ],
            thumbnail: {
              url: mGuild.iconURL
            },
            footer: {
              text: "Requested by " + msg.member.displayName,
              icon_url: msg.author.avatarURL
            }
          }
        });
      } else {
        msg.channel.send({
          embed: {
            description: "Server Unavailable",
            color: color,
            footer: {
              text: "Please try again later"
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
      msg.channel.send({
        embed: {
          description: "Cannot Get Server Info",
          color: color
        }
      });
    }
  }
}

module.exports = ServerInfo;