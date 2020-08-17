const { RichEmbed } = require('discord.js');

module.exports.run = async (tracker, message, args, db) => {
    let language = db.get(`language_${message.guild.id}`);
    if(!message.member.hasPermission('ADMINISTRATOR') || !message.guild.owner) {
        if(language == "ru") {
            if(!message.member.hasPermission('ADMINISTRATOR') || !message.guild.owner) {
                let nopal = new RichEmbed()
                .setColor("RED")
                .setDescription(`${message.author.username}, у вас нет прав для использования данной команды.`)
                .setTimestamp()
                return message.channel.send(nopal);
            }
        }else if(language == "en") {
            let nopal = new RichEmbed()
            .setColor("RED")
            .setDescription(`${message.author.username}, you don't have access for use this command.`)
            .setTimestamp()
            return message.channel.send(nopal);
        }
    }
    if(language == "ru") {
        let qq = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Добро пожаловать в команду **Anti-Invite**!\nДанная команда контролирует приглашения сервера.\nЕсли вы включите данную систему, то при создании приглашения, приглашение будет удалено.\nУ вас появилась 1 реакция, вы должны решить, включить ли систему или нет, на раздумие у вас есть меньше 25 секунд с момента отправки данного сообщения.\n1. Включить систему.\n2. Выключить систему.`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        let msg = await message.channel.send(qq);
        await msg.react('1️⃣');
        await msg.react('2️⃣');
        const filter = (reaction, user) => user.id === message.author.id; //user.id !== message.client.user.id
        const collector = msg.createReactionCollector(filter, { time: 25000 });
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case "1️⃣":
                    db.set(`antiinvite_${message.guild.id}`, 1);
                    let on = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`Вы включили систему **Anti-Invite**!`)
                    .setTimestamp()
                    message.channel.send(on);
                break;
                case "2️⃣":
                    db.set(`antiinvite_${message.guild.id}`, 0);
                    let off = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`Вы выключили систему **Anti-Invite**!`)
                    .setTimestamp()
                    message.channel.send(off);
                break;
                                    
            }
        });
    }else if(language == "en") {
        let Msg = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Welcome to **Anti-Invite** command!\nThis system is controlling invites.\nIf you enable this system, then if someone create new invite, invite will be deleted.\nYou have 1 reaction, you must decide whether to turn on the system or not, for thought you have less than 25 seconds from the moment of sending this message.\n1. Turn on the system.\n2. Turn off the system.`)
        .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        let msg = await message.channel.send(Msg);
        await msg.react('1️⃣');
        await msg.react('2️⃣');
        const filter = (reaction, user) => user.id === message.author.id; //user.id !== message.client.user.id
        const collector = msg.createReactionCollector(filter, { time: 25000 });
        collector.on('collect', (reaction, user) => {
            switch (reaction.emoji.name) {
                case "1️⃣":
                    db.set(`antiinvite_${message.guild.id}`, 1);
                    let onf = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`You enabled **Anti-Invite** system!`)
                    .setTimestamp()
                    message.channel.send(onf);
                break;
                case "2️⃣":
                    db.set(`antiinvite_${message.guild.id}`, 0);
                    let offf = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`You turned off **Anti-Invite** system!`)
                    .setTimestamp()
                    message.channel.send(offf);
                break;             
            }
        });
    }
}