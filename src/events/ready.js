module.exports = (tracker) => {
    console.log(`Трекер с именем ${tracker.user.username} был запущен.`);
  
    let statuses = [
        `Prefix: i!`,
        `Creator: bad boy#1046`,
        `${tracker.guilds.size} guilds!`,
        `i!help`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        tracker.user.setActivity(status, {type: "WATCHING"});

    }, 15000)
}