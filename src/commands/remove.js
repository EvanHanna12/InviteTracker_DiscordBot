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
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) {
            let noMention = new RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`Упомяните пользователя для удаления из списка Иммунитетов!`)
            .setTimestamp()
            return message.channel.send(noMention); 
        }

        let base = db.fetch(`immunity_${message.guild.id}`);

        let newArray = base.filter(user => user.userID !== `${member.id}`);
        db.set(`immunity_${message.guild.id}`, newArray);
        db.delete(`immunity_${message.guild.id}_${member.id}`);

        let RemoveFromBase = new RichEmbed()
        .setColor('DARK-BLUE')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`Пользователь ${member} был удалён из списка Иммунитетов!`)
        .setTimestamp();
        return message.channel.send(RemoveFromBase);
    }else if(language === "en") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) {
            let noMention = new RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`Mention user to be removed from the list of Immunities!`)
            .setTimestamp()
            return message.channel.send(noMention); 
        }

        let base = db.fetch(`immunity_${message.guild.id}`);

        let newArray = base.filter(user => user.userID !== `${member.id}`);
        db.set(`immunity_${message.guild.id}`, newArray);
        db.delete(`immunity_${message.guild.id}_${member.id}`);

        let RemoveFromBase = new RichEmbed()
        .setColor('DARK-BLUE')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`User ${member} has been removed from the list of Immunities!`)
        .setTimestamp();
        return message.channel.send(RemoveFromBase);
    }
}