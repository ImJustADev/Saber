const Command = require('./Command.js');
const fs = require('fs');

const categories = ["Codes", "Fun", "Technical", "Misc."];
const other_words = ["Robery", "Kidnap", "Hug", "Fruitcake", "Murder", "Octapus", "Hitman", "Stab", "Love", "Motivation", "AK-47", "Knife"];
const color = 0xFF9900;

// g!help <cmd>

class Help extends Command {
  constructor(msg) {
    super(msg);
    try {
      var parsable = msg.content.split(" ")[1]; 
      if (parsable.startsWith("g!")) { 
        parsable = parsable.substring(2); 
      }
      /*
      if (parsable == "subsection") { // Special case
        parsable = "subsection";
      }
      */

      var found = false;
      fs.readFile('./commands/templates/commands.json', 'utf8', function(err, data) {
        if (err) throw err;
        var obj = JSON.parse(data);
        for (var i = 0; i < obj.length; i++) {
          for (var j = 0; j < obj[i].length; j++) {
            if (obj[i][j].name.toLowerCase() == parsable.toLowerCase()) {
              msg.channel.send({
                embed: {
                  author: {
                    name: "Help"
                  },
                  title: "**g!" + obj[i][j].name + "**",
                  color: color,
                  description: obj[i][j].help,
                }
              });
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