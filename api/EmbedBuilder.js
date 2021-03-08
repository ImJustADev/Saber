const Discord = require('discord.js');
const Message = require('./Message.js');
const User = require('./User.js');


class EmbedBuilder {
	constructor(
		title, description, url, color,
		timestamp, footerIconURL, footerText, thumbnailURL,
		authorName, authorURL, authorIconURL) {

		var embed = new Discord.MessageEmbed();
		embed.setTitle(title);
		embed.setDescription(description);
		embed.setURL(url);
		embed.setColor(color);
		embed.setTimestamp(timestamp);
		embed.setFooter(footerText, footerIconURL);
		embed.setThumbnail(thumbnailURL);
		embed.setAuthor(authorName, authorURL, authorIconURL);

	}
	createField(name, value, inline) {
		embed.addField(name, value, inline);
	}
}

module.exports = EmbedBuilder;

