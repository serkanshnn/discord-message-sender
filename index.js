require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({ intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.DIRECT_MESSAGES,
    ] });

const token = process.env.TOKEN;

client.on('ready', () => {
    console.log('The client is ready!');

    client.users.fetch(process.env.ADMIN_USER_ID, false).then((user) => {
        user.send('I am ready to hide messages :detective:');
    })

    let date;

    client.on('messageCreate', (message) => {
        date = new Date();
        if (!message.author.bot && !message.guildId) {
            console.log(`[${date}] Message received!`);
            client.channels.fetch(process.env.CHANNEL_ID).then((channel) => {
                channel.send(message.content);
            });
        }
    });
});

client.login(token);