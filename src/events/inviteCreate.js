const db = require('quick.db');
const { RichEmbed, Client } = require('discord.js');
const tracker = new Client();

module.exports = async(tracker, invite) => {
    tracker.guildInvites.set(invite.guild.id, await invite.guild.fetchInvites());

    let language = db.get(`language_${invite.guild.id}`);
    if(language == "ru") {
        let inviteRestrict = db.get(`antiinvite_${invite.guild.id}`);
        if(inviteRestrict === 1) {
            if(db.has(`immunity_${invite.guild.id}_${invite.inviter.id}`, true)) {
                let qq = invite.maxUses;
                if(qq === 0) qq = "Бесконечно";
            
                let created = new RichEmbed()
                .setColor("DARK-BLUE")
                .setDescription(`Было создано приглашение!\nСсылка: **${invite.url}**\nКод: **${invite.code}**\nМаксимальное количество использований: **${qq}**\nСоздатель приглащения: **${invite.inviter.username}**`)
                .setThumbnail(`https://i.imgur.com/vRX7RzB.png`)
                .setTimestamp()
                let channelq = invite.channel.id;
                let q = invite.guild.channels.get(channelq);
                q.send(created);
    
                let invitechannel = db.get(`invitelogchannel_${invite.guild.id}`);
                if(!invitechannel) return
                else {
                    let createdInvite = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`Было создано новое приглашение пользователем **${invite.inviter.username}**.\nИнформация:\nСсылка: **${invite.url}**\nКод: **${invite.code}**\nМаксимальное количество использований: **${qq}**\nКанал, где было создано приглашение: <#${invite.channel.id}>`)
                    .setTimestamp()
    
                    let channels = invite.guild.channels.get(invitechannel);
                    return channels.send(createdInvite);
                }
            }else {
                invite.delete();
                let embeed = new RichEmbed()
                .setColor("RED")
                .setDescription(`**${invite.inviter.username}**, приглашение было удалено!\nСоздатель запретил создавать приглашения!`)
                .setTimestamp()

                let channelw = invite.channel.id;
                let q = invite.guild.channels.get(channelw);
                q.send(embeed);                
            }
        }else if(inviteRestrict === 0) {
            let qq = invite.maxUses;
            if(qq === 0) qq = "Бесконечно";
        
            let created = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`Было создано приглашение!\nСсылка: **${invite.url}**\nКод: **${invite.code}**\nМаксимальное количество использований: **${qq}**\nСоздатель приглащения: **${invite.inviter.username}**`)
            .setThumbnail(`https://i.imgur.com/vRX7RzB.png`)
            .setTimestamp()
            let channelq = invite.channel.id;
            let q = invite.guild.channels.get(channelq);
            q.send(created);

            let invitechannel = db.get(`invitelogchannel_${invite.guild.id}`);
            if(!invitechannel) return
            else {
                let createdInvite = new RichEmbed()
                .setColor("DARK-BLUE")
                .setDescription(`Было создано новое приглашение пользователем **${invite.inviter.username}**.\nИнформация:\nСсылка: **${invite.url}**\nКод: **${invite.code}**\nМаксимальное количество использований: **${qq}**\nКанал, где было создано приглашение: <#${invite.channel.id}>`)
                .setTimestamp()

                let channels = invite.guild.channels.get(invitechannel);
                return channels.send(createdInvite);
            }
        }
    }else if(language == "en") {
        let inviteRestrict = db.get(`antiinvite_${invite.guild.id}`);
        if(inviteRestrict === 1) {
            if(db.has(`immunity_${message.guild.id}_${invite.inviter.id}`, true)) {
                let qq = invite.maxUses;
                if(qq === 0) qq = "Infinity";
        
                let created = new RichEmbed()
                .setColor("DARK-BLUE")
                .setDescription(`Invite created!\nLink: **${invite.url}**\nCode: **${invite.code}**\nMax Uses: **${qq}**\nInvite Creator: **${invite.inviter.username}**`)
                .setThumbnail(`https://i.imgur.com/vRX7RzB.png`)
                .setTimestamp()
                let channelq = invite.channel.id;
                let q = invite.guild.channels.get(channelq);
                q.send(created);
    
                let invitechannel = db.get(`invitelogchannel_${invite.guild.id}`);
                if(!invitechannel) return
                else {
                    let createdInvite = new RichEmbed()
                    .setColor("DARK-BLUE")
                    .setDescription(`New invite was created by <@${invite.inviter.id}>.\nInformation:\nLink: **${invite.url}**\nCode: **${invite.code}**\nMax Uses: **${qq}**\nChannel, where invite was created: <#${invite.channel.id}>`)
                    .setTimestamp()
    
                    let channels = invite.guild.channels.get(invitechannel);
                    return channels.send(createdInvite);
                }                
            }else {
                invite.delete();
                let embeed = new RichEmbed()
                .setColor("RED")
                .setDescription(`**${invite.inviter.username}**, invite has been deleted!\nCreator has forbidden to create invitations!`)
                .setTimestamp()
                let channelw = invite.channel.id;
                let q = invite.guild.channels.get(channelw);
                q.send(embeed);
            }
        }else if(inviteRestrict === 0) {
            let qq = invite.maxUses;
            if(qq === 0) qq = "Infinity";
    
            let created = new RichEmbed()
            .setColor("DARK-BLUE")
            .setDescription(`Invite created!\nLink: **${invite.url}**\nCode: **${invite.code}**\nMax Uses: **${qq}**\nInvite Creator: **${invite.inviter.username}**`)
            .setThumbnail(`https://i.imgur.com/vRX7RzB.png`)
            .setTimestamp()
            let channelq = invite.channel.id;
            let q = invite.guild.channels.get(channelq);
            q.send(created);

            let invitechannel = db.get(`invitelogchannel_${invite.guild.id}`);
            if(!invitechannel) return
            else {
                let createdInvite = new RichEmbed()
                .setColor("DARK-BLUE")
                .setDescription(`New invite was created by <@${invite.inviter.id}>.\nInformation:\nLink: **${invite.url}**\nCode: **${invite.code}**\nMax Uses: **${qq}**\nChannel, where invite was created: <#${invite.channel.id}>`)
                .setTimestamp()

                let channels = invite.guild.channels.get(invitechannel);
                return channels.send(createdInvite);
            }
        } 
    }
}