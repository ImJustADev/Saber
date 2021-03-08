const Command = require('./Command.js');
var config = require('../config.json');

const color = 10197915;
const orange = 0xFF9900;

var logo = "https://cdn.discordapp.com/attachments/816877389018824704/816878422524559401/orange.png";
var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

class Profile extends Command {
  constructor(msg) {
    super(msg);

    
    var timestamp = msg.member.joinedAt;
    var u_month = timestamp.getMonth();
    var u_day = timestamp.getDate();
    var u_year = timestamp.getFullYear();
    var joined = u_month + "/" + u_day + "/" + u_year; 

    //add delay to cmd
    msg.delete();
    msg.channel.send({
      content: ":white_check_mark: Successfully found client entry...\nDisplaying contents of user profile named **" + msg.member.user.tag + "**\n\n",
      embed: {
        title: "__" + msg.author.username + "'s User Profile__",
        color: msg.member.roles.highest.color,
        thumbnail: {
          "url": msg.author.avatarURL()
        },
        author: {
          name: "g!help profile",
          "icon_url": logo,
        },

      fields: [
        {
          name: "**About This Page**",
          value: "This page shows general user information\nReact to the emotes to navigate your profile.",
          inline: false
        },       
        {
          name: "**General Info**",
          value: "Joined: `" + joined +
                 "`\nName:    `" + msg.author.username +
                 "`\nTag:    `" + msg.member.user.tag +
                 "`\nRank:   `" + msg.member.roles.highest.name +
                 "`\nStatus: `" + msg.member.user.presence.status +
                 "`\n",
          inline: true
        },
      ],
      footer: {
        text: "Page 1 of 1",
      },
    },
    }).then(msg => {
      msg.react("➡️");
    }); //end of msg.channel.send
  } // end of constructor
}

module.exports = Profile;