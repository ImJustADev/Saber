const Command = require('../api/Command.js');
const newEmbed = require('../api/EmbedBuilder.js');
const fs = require('fs');

var config = require('../config.json');
var msg_config = require('../msg.json');
const EmbedBuilder = require('../api/EmbedBuilder.js');

// Variables
const prefix = config.BOT_PREFIX;
const color = config.EMBED_COLOR;
const categories = config.HELP_CATEGIRES;
const fURL = config.FOOTER_ICON_URL;

class Help extends Command {
  constructor(msg) {
    super(msg);
    try {
      var userInput = msg.content.split(" ")[1]; 
      if (userInput.startsWith(prefix)) { 
        userInput = userInput.substring(2); 
      }
      /*
      if (userInput == "subsection") { // Special case
        userInput = "subsection";
      }
      */

      var found = false;
      fs.readFile('./commands/templates/commands.json', 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < obj[i].length; j++) {
            if (obj[i][j].name.toLowerCase() == userInput.toLowerCase()) {

              const helpMenu = new EmbedBuilder(prefix + obj[i][j].name,obj[i][j].help,null,color,null,fURL,msg.author.name,null,"Command List",null,msg.author.avatarURL(),);
              msg.channel.send(helpMenu);
              /*
              msg.channel.send({
                embed: {
                  author: {
                    name: "Help"
                  },
                  title: "**" + prefix + obj[i][j].name + "**",
                  color: color,
                  description: obj[i][j].help,
                }
                */
              found = true;
              break;
            }
          }
        }
        if (found == false) {
          //add random array to select elements out of
          var insertme = other_words[Math.floor(Math.random() * other_words.length)];
          msg.channel.send("*Depressed Gecko Noises...*\n:x: Command was not found!\n\nSorry but Geckos don't speak French...\nTrecco thought you typed **\"" + insertme + "**\"");
        }
      });
    } catch (e) { // General g!help
      fs.readFile('./commands/templates/commands.json', 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        var message = [];
        for (var i = 0; i < obj.length; i++) {
          message[i] = "";
          for (var j = 0; j < obj[i].length; j++) {
            message[i] += "`" + obj[i][j].name + "` ";
          }
        }
        msg.channel.send({
          embed: {
            author: {
              name: "Help"
            },
            title: "**Command List**",
            color: color,
            description: "To use this bot type `g![command]`. Commands are *not* case-sensitive. Use `g!help [command]` for more information about a specific command.",
            fields: [{
                name: categories[0],
                value: message[0]
              },
              {
                name: categories[1],
                value: message[1]
              },
              {
                name: categories[2],
                value: message[2]
              },
              {
                name: categories[3],
                value: message[3]
              }
            ]
          }
        });
      });
    }
  }
}

module.exports = Help;