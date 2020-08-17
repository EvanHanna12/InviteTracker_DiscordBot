const { RichEmbed, Client } = require('discord.js');
const db = require('quick.db');
const { ownerid } = require('../config.json');
const tracker = new Client();

module.exports = async (tracker, guild) => {
    db.set(`antiinvite_${guild.id}`, 0);
    db.set(`language_${guild.id}`, "ru");

    let embed = new RichEmbed()
    .setColor("GREEN")
    .setDescription(`Спасибо за добавление бота, надеюсь, что он вам понравится!\nСписок команд бота: **i!help**\nОсобенности бота:\n1. Отправляет сообщение при создании приглашения.\n2. Имеет **Мультиязычность**.\n3. Имеет команду на запрет создания приглашений.\nВыберите язык для дальнейших сообщений с помощью реакций снизу.\n1. Русский.\n2. Английский.\n--------------------------------------\nThanks for adding the bot, I hope you like it!\nFeatures of the bot:\n1. Sends a message when creating an invitation.\n2. Has **Multilingualism**.\n3. It has a command to prohibit the creation of invitations.\nSelect the language for further messages using the reactions below.\n1. Russian.\n2. English.`)
    .setFooter(`<3 | Спасибо | Thanks`)
    .setTimestamp()

    let msgg = await guild.owner.send(embed);
    await msgg.react('1️⃣');
    await msgg.react('2️⃣');

    const filter = (reaction, user) => user.id === guild.owner.id;
    const collector = msgg.createReactionCollector(filter, { time: 1800000 });

    collector.on('collect', (reaction, user) => {
        switch(reaction.emoji.name) {
            case "1️⃣":
                db.set(`language_${guild.id}`, 'ru');
                let RussianSelect = new RichEmbed()
                .setColor('DARK-BLUE')
                .setDescription(`Вы выбрали **Русский** язык для дальнейших сообщений.\nПриятного использования!`)
                .setTimestamp()
                guild.owner.send(RussianSelect);
                msgg.reactions.forEach(reaction => reaction.remove(user.id));
            break;
            case "2️⃣":
                db.set(`language_${guild.id}`, 'en');
                let EnglishSelect = new RichEmbed()
                .setColor('DARK-BLUE')
                .setDescription(`You have chosen **English** language for next messages.\nEnjoy using this bot!`)
                .setTimestamp()
                guild.owner.send(EnglishSelect);
                msgg.reactions.forEach(reaction => reaction.remove(user.id));
            break;
        }
    });

    let content = `Бот был добавлен на сервер!\nНазвание сервера: **${guild.name}**\nID сервера: **${guild.id}**\nИмя создателя сервера: **${guild.owner.displayName}**`
    let newServer = new RichEmbed()
    .setColor("DARK-BLUE")
    .setDescription(content)
    .setTimestamp()

    tracker.users.get(ownerid).send(newServer);
}