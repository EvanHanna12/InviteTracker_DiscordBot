const { RichEmbed, Client, Message } = require('discord.js');
const quick = require('quick.db');

/**
 ** For exports.run
 * @param {Client} tracker 
 * @param {Message} message 
 * @param {*} args 
 * @param {quick} db 
*/

exports.run = async(tracker, message, args, db) => {
    let language = db.fetch(`language_${message.guild.id}`);
    if(language === "ru") {
        let base = db.fetch(`immunity_${message.guild.id}`);

        let i;
        let users = [];
        for(i = 0; i < base.length; i++) {
            users.push(`<@${base[i].userID}>`);
        }

        let embed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`Пользователи в списке Иммунитетов:\n${users}`)
        .setTimestamp();
        return message.channel.send(embed);
    }else if(language === "en") {
        let base = db.fetch(`immunity_${message.guild.id}`);

        let i;
        let users = [];
        for(i = 0; i < base.length; i++) {
            users.push(`<@${base[i].userID}>`);
        }

        let embed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`Users in the list of Immunities:\n${users}`)
        .setTimestamp();
        return message.channel.send(embed);
    }
}