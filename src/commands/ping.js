const { RichEmbed } = require('discord.js');

module.exports.run = async (tracker, message, args, db) => {
    let language = db.get(`language_${message.guild.id}`);
    if(language == "ru") {
        let fast = new RichEmbed()
        .setColor('DARK-BLUE')
        .setDescription(`Подготовка...`)
        .setTimestamp()

        let msg = await message.channel.send(fast);
        let botping = Math.floor(tracker.ping);
        let choises = ["Как думаешь, это хорошо, или плохо?", "Иногда пинг бывает не таким хорошим..."];
        let choise = choises[Math.floor(Math.random() * choises.length)];

        let PingHelp = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`${choise}\nПинг бота: **${botping}**мс`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()

        await msg.edit(PingHelp);
    }else if(language == "en") {
        let fast = new RichEmbed()
        .setColor('DARK-BLUE')
        .setDescription(`Preparing...`)
        .setTimestamp()

        let msg = await message.channel.send(fast);
        let botping = Math.floor(tracker.ping);
        let choises = ["Do you think this is good or bad?", "Sometimes ping is not so good..."];
        let choise = choises[Math.floor(Math.random() * choises.length)];

        let PingHelp = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`${choise}\nBot Ping: **${botping}**ms`)
        .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()

        await msg.edit(PingHelp);
    }
}