const { RichEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (tracker, message, args, db) => {
    let language = db.get(`language_${message.guild.id}`);
    if(language == "ru") {
        const duration = moment.duration(tracker.uptime).format("H [часов], m [минут(ы)], s [секунд(ы)]");
        let UptimeCommand = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Время работы бота: ${duration}`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(UptimeCommand);
    }else if(language == "en") {
        const duration = moment.duration(tracker.uptime).format("H [hours], m [minutes], s [seconds]");
        let UptimeCommand = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Bot Working Time: ${duration}`)
        .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(UptimeCommand);
    }
}