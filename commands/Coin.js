const Command = require('./Command.js');
var config = require('../config.json');

class Coin extends Command {
  constructor(msg) {
    super(msg);
    var headsTails = getRandomInt(0, 100);
    if (headsTails < 49) {
      msg.reply(" You have started a coin toss!!!\n\n*Throws coin into the air... wooosh*\nYou landed on... **HEADS** :coin:\n\nDoes Trecco get Treat? ;-;");
    } else if (headsTails < 99) {
      msg.reply(" You have started a coin toss!!!\n\n*Throws coin into the air... wooosh*\nYou landed on... **TAILS** :coin:\n\nDoes Trecco get Treat? ;-;");
    } else {
      msg.channel.send("*Confused Lizard Noises*")
        .then(message => {
          msg.channel.startTyping();
          setTimeout(function() {
            msg.channel.send("OMG! No way! It landed on its side! Maybe try again? ;-;");
            msg.channel.stopTyping();
          }, 3000);
        });
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = Coin;