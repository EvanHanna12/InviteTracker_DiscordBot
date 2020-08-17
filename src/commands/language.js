const { RichEmbed } = require('discord.js');

exports.run = async(tracker, message, args, db) => {
    let language = db.get(`language_${message.guild.id}`);
    if(!message.guild.owner) {
        
    }
    if(language == "ru") {
        let choose = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Добро пожаловать в команду **language**!\nДанная команда предназначена для тех, кто случайно выбрал не тот язык.`)
        .setFooter(`Запросил: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()

        let timetochoose = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`<@${message.author.id}>, сейчас у вас появится реакция, вам нужно будет решить, переключать язык на **Английский** или нет.\nВремя на решение: **1 минута**.`)
        .setTimestamp()

        message.channel.send(choose);
        let msg = await message.channel.send(timetochoose);
        await msg.react('✅');

        const filter = (reaction, user) => user.id === message.author.id;
        const collector = msg.createReactionCollector(filter, { time: 60000 });

        collector.on('collect', (reaction, user) => {
            switch(reaction.emoji.name) {
                case "✅":
                    db.set(`language_${message.guild.id}`, "en");
                    let EnglishSetted = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`<@${message.author.id}>, success!\nYou set **English** as the main language.`)
                    .setTimestamp()
                    message.channel.send(EnglishSetted);
                    msg.reactions.forEach(reaction => reaction.remove(user.id));
                break;
            }
        });
    }else if(language == "en") {
        let choose = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`Welcome to **language** command!\nThis command is intended for those who accidentally chose the wrong language.`)
        .setFooter(`Requested by: ${message.author.username}`, message.author.displayAvatarURL)
        .setTimestamp()

        let timetochoose = new RichEmbed()
        .setColor("DARK-BLUE")
        .setDescription(`<@${message.author.id}>, now you will have a reaction, you will need to decide whether to switch the language to **Russian** or not.\nTime for decisions: **1 minute**.`)
        .setTimestamp()

        message.channel.send(choose);
        let msg = await message.channel.send(timetochoose);
        await msg.react('✅');

        const filter = (reaction, user) => user.id === message.author.id;
        const collector = msg.createReactionCollector(filter, { time: 60000 });

        collector.on('collect', (reaction, user) => {
            switch(reaction.emoji.name) {
                case "✅":
                    db.set(`language_${message.guild.id}`, "ru");
                    let RussianSetted = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`<@${message.author.id}>, успех!\nВы поставили **Русский** язык как основной.`)
                    .setTimestamp()
                    message.channel.send(RussianSetted);
                    msg.reactions.forEach(reaction => reaction.remove(user.id));
                break;
            }
        });
    }
} 