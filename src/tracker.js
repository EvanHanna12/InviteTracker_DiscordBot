const { Client, RichEmbed, Collection } = require('discord.js');
const tracker = new Client({
    disableEveryone: true
});

const Enmap = require('enmap');
const guildInvites = new Map();

tracker.guildInvites = guildInvites;

const { token, default_prefix } = require('./config.json');
tracker.login(token);

tracker.token = token;
tracker.prefix = default_prefix;

const db = require('quick.db');
const ms = require('ms');
const fs = require('fs');

fs.readdir("./src/events", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Загружаю ивент ${eventName}.js`);
        console.log('--------------------------------');
        tracker.on(eventName, event.bind(null, tracker));
    });
});

tracker.commands = new Enmap();

fs.readdir("./src/commands", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Попытка загрузить команду ${commandName}`);
        console.log('--------------------------------');
        tracker.commands.set(commandName, props);
    });
});

tracker.once('ready', () => {
    tracker.guilds.forEach(guild => {
        guild.fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(e => console.log(e));
    });
});