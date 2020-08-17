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
            .setDescription(`Упомяните пользователя для добавления в список Иммунитетов!`)
            .setTimestamp()
            return message.channel.send(noMention); 
        }

        let immunitybase = db.fetch(`immunity_${message.guild.id}`) || db.set(`immunity_${message.guild.id}`, []);
        db.push(`immunity_${message.guild.id}`, { 'userID': member.id });
        db.set(`immunity_${message.guild.id}_${member.id}`, true);

        //Embeds
        let AlreadyInBase = new RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`Пользователь ${member} уже есть в списке Иммунитета!`)
        .setTimestamp();

        var i;
        var users = [];
        for(i = 0; i < immunitybase.length; i++) {
            users.push(immunitybase[i].userID);
        }
        if(users.includes(member.id)) return message.channel.send(AlreadyInBase);

        let AddedToBase = new RichEmbed()
        .setColor('DARK-BLUE')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`Пользователь ${member} добавлен в список Иммунитетов!`)
        .setTimestamp();
        return message.channel.send(AddedToBase);
    }else if(language === "en") {
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member) {
            let noMention = new RichEmbed()
            .setColor("RED")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(`Mention user to add to the list of Immunities!`)
            .setTimestamp()
            return message.channel.send(noMention); 
        }

        let immunitybase = db.fetch(`immunity_${message.guild.id}`) || db.set(`immunity_${message.guild.id}`, []);
        db.push(`immunity_${message.guild.id}`, { 'userID': member.id });
        db.set(`immunity_${message.guild.id}_${member.id}`, true);

        //Embeds
        let AlreadyInBase = new RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`Member ${member} already on the list of Immunity!`)
        .setTimestamp();

        var i;
        var users = [];
        for(i = 0; i < immunitybase.length; i++) {
            users.push(immunitybase[i].userID);
        }
        if(users.includes(member.id)) return message.channel.send(AlreadyInBase);

        let AddedToBase = new RichEmbed()
        .setColor('DARK-BLUE')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setDescription(`User ${member} added on the list of Immunity!`)
        .setTimestamp();
        return message.channel.send(AddedToBase);        
    }
}