const { RichEmbed } = require('discord.js');
const { inspect } = require('util');
const { ownerid } = require('../config.json');

exports.run = async(tracker, message, args, db) => {
    if(message.author.id != ownerid) {
        let noright = new RichEmbed()
        .setColor("RED")
        .setDescription(`<@${message.author.id}>, у вас нет доступа к данной команде!`)
        .setTimestamp()
        return message.channel.send(noright)
    }
    try {
        let toEval = args.join(' ');
        let evaluated = inspect(eval(toEval, { depth: 0 }));
        if(!toEval) {
            let noToEval = new RichEmbed()
            .setColor('DARK-BLUE')
            .setDescription(`<@${message.author.id}>, произошла ошибка во время обработки кода:\n**Ошибка \`air\`**`)
            .setTimestamp()
            return message.channel.send(noToEval);
        }else {
            if(toEval == "tracker.token") {
                let no = new RichEmbed()
                .setColor("RED")
                .setDescription(`<@${message.author.id}>, запрещено получать токен бота через **Eval**`)
                return message.channel.send(no);
            }
            let hrStart = process.hrtime()
            let hrDiff;
            hrDiff = process.hrtime(hrStart);
            
            let Embed = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`Заданный код:\n**\`${toEval}\`**\nОтвет: **${evaluated}**`)
            .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
            return message.channel.send(Embed);
        }
    } catch (error) {
        const Error = new RichEmbed()
        .setColor('DARK-BLUE')
        .setDescription(`<@${message.author.id}>, произошла ошибка во время обработки кода:\n\`${error.message}\``)
        .setTimestamp()
        return message.channel.send(Error);
    }
}