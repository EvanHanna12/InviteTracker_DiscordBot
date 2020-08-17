const { RichEmbed } = require('discord.js');

exports.run = async (tracker, message, args, db) => {
    let language = db.get(`language_${message.guild.id}`);
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
    let antiinvitecheck = db.get(`antiinvite_${message.guild.id}`);
    if(antiinvitecheck === 1) {
        if(language == "ru") {
            let cant = new RichEmbed()
            .setColor("RED")
            .setDescription(`<@${message.author.id}>, включена система **Anti-Invite**.\nВы не можете использовать данную команду.`)
            .setTimestamp()
            return message.channel.send(cant);
        }else if(language === "en") {
            let cant = new RichEmbed()
            .setColor("RED")
            .setDescription(`<@${message.author.id}>, **Anti-Invite** system is enabled.\nYou cannot use this command.`)
            .setTimestamp()
            return message.channel.send(cant);
        }
    }else if(antiinvitecheck === 0) {
        let language = db.get(`language_${message.guild.id}`);
        if(language == "ru") {
            let chatchannel = message.mentions.channels.first() || message.guild.channels.get(args[0]);
            if(!chatchannel) {
                let NoMentionedChannel = new RichEmbed()
                .setColor("RED")
                .setDescription(`<@${message.author.id}>, вы не упомянули канал.`)
                .setTimestamp()
                return message.channel.send(NoMentionedChannel);
            }
            message.guild.channels.get(chatchannel);
            db.set(`invitelogchannel_${message.guild.id}`, chatchannel.id);
            let setted = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`<@${message.author.id}>, вы установили канал <#${chatchannel.id}> для логов об инвайтах.`)
            .setTimestamp()
            return message.channel.send(setted);
        }else if(language == "en") {
            let chatchannel = message.mentions.channels.first();
            if(!chatchannel) {
                let NoMentionedChannel = new RichEmbed()
                .setColor("RED")
                .setDescription(`<@${message.author.id}>, you did not mention channel.`)
                .setTimestamp()
                return message.channel.send(NoMentionedChannel);
            }
            db.set(`invitelogchannel_${message.guild.id}`, chatchannel.id);
            let Setted = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`<@${message.author.id}>, you setted channel <#${chatchannel.id}> for invite logs.`)
            .setTimestamp()
            return message.channel.send(Setted);
        }
    }
}