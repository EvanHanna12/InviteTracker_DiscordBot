const { RichEmbed } = require('discord.js');

exports.run = async (tracker, message, args, db) => {
    if(!message.guild.owner) {
        let language = db.get(`language_${message.guild.id}`);
        if(language == "ru") {
            let nopal = new RichEmbed()
            .setColor("RED")
            .setDescription(`<@${message.author.id}>, у вас нет прав для использования данной команды.`)
            .setTimestamp()
            return message.channel.send(nopal);
        }else if(language == "en") {
            let nopal = new RichEmbed()
            .setColor("RED")
            .setDescription(`<@${message.author.id}>, you don't have access for use this command.`)
            .setTimestamp()
            return message.channel.send(nopal);
        }
    }

    if(db.has(`welcomechannel_${message.guild.id}`, channel.id)) {
        let language = db.get(`language_${message.guild.id}`);
        if(language == "ru") {
            let alreadyRU = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`<@${message.author.id}>, у вас уже стоит канал **${channel.id}`)
        }
    }

    let language = db.get(`language_${message.guild.id}`);
    if(language == "ru") {
        let channel = message.mentions.channels.first();
        if(!channel) {
            let NoMentionedChannel = new RichEmbed()
            .setColor("RED")
            .setDescription(`<@${message.author.id}>, вы не упомянули канал.`)
            .setTimestamp()
            return message.channel.send(NoMentionedChannel);
        }else {
            db.set(`welcomechannel_${message.guild.id}`, channel.id);
    
            let setted = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`<@${message.author.id}>, вы установили канал **<@${channel.id}>** для приветствий с участниками.`)
            .setTimestamp()
            return message.channel.send(setted);
        }
    }else if(language == "en") {
        let channel = message.mentions.channels.first();
        if(!channel) {
            let NoMentionedChannel = new RichEmbed()
            .setColor("RED")
            .setDescription(`<@${message.author.id}>, you did not mention channel.`)
            .setTimestamp()
            return message.channel.send(NoMentionedChannel);
        }else {
            db.set(`welcomechannel_${message.guild.id}`, channel.id);
    
            let setted = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`<@${message.author.id}>, you setted channel **<@${channel.id}>** for greetings with members.`)
            .setTimestamp()
            return message.channel.send(setted);
        }
    }
}