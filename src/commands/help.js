const { RichEmbed } = require('discord.js');
const { default_prefix } = require('../config.json');

module.exports.run = async (tracker, message, args, db) => {
    let language = db.get(`language_${message.guild.id}`);
    if(language == "ru") {
        let HelpEmbed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Добро пожаловать в команду **help**!\nПрефикс: **${default_prefix}**\nСписок команд:\n1. **anti-invite** - Система Anti-Invite.\n2. **ping** - Пинг бота.\n3. **uptime** - Время работы бота.\n4. **invitelogchannel** - Канал для уведомлений о создании приглашения.\n6. **language** - Сменить язык бота.\n7. **immunity** - Добавить пользователя в список защиты от удаления приглашений.\n8. **remove** - Удалить пользователя из списка защиты от удаления приглашений.\n9. **list** - Список пользователей, имеющих защиту от удаления приглашений.`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(HelpEmbed);
    }else if(language == "en") {
        let HelpEmbed = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Welcome to the **help** command!\nPrefix: **${default_prefix}**\nCommand list:\n1. **anti-invite** - Anti-Invite System.\n2. **ping** - Bot ping.\n3. **uptime** - Bot working time.\n4. **invitelogchannel** - Channel for creating invitation notifications.\n6. **language** - Change bot language.\n7. **immunity** - Add user to the list of Immunity against deleting invitations.\n8. **remove** - Remove user from the list of Immunity against deleting invites.\n9. **list** - List of users, who have protection against deleting invites.`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()
        return message.channel.send(HelpEmbed);
    }
}