module.exports = (tracker, message) => {
    if(message.author.bot || !message.guild) return;
    if(message.content.indexOf('i!') !== 0) return;

    const args = message.content.slice('i!'.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const db = require('quick.db');

    const cmd = tracker.commands.get(command);
    if(!cmd) return;

    cmd.run(tracker, message, args, db);
}