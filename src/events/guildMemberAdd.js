const { RichEmbed, Client } = require('discord.js');
const db = require('quick.db');
const tracker = new Client();

module.exports = async(tracker, member) => {
    const cashedInvites = tracker.guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    tracker.guildInvites.set(member.guild.id, newInvites);

    let language = db.get(`language_${member.guild.id}`);
    if(language == "ru") {
        try {
            const usedInvite = newInvites.find(inv => cashedInvites.get(inv.code).uses < inv.uses);
    
            const welcome = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`Добро пожаловать на сервер, **${member.user.username}**!\nПригласил: **${usedInvite.inviter.username}**.\nВсего пригласил: **${usedInvite.uses}** участника(ов).`)
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL)
            let channelw = usedInvite.channel.id;
            let channel = member.guild.channels.get(channelw);
            channel.send(welcome);
        }catch(e) {
            console.log(e);
        }
    }else if(language == "en") {
        try {
            const usedInvite = newInvites.find(inv => cashedInvites.get(inv.code).uses < inv.uses);
    
            const welcome = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`Welcome to the server, **${member.user.username}**!\nInvited: **${usedInvite.inviter.username}**.\nTotal invited: **${usedInvite.uses}** members.`)
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL)
            let channelw = usedInvite.channel.id;
            let channel = member.guild.channels.get(channelw);
            channel.send(welcome);
        }catch(e) {
            console.log(e);
        }
    }
}