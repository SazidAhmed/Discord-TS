import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
	console.log('Bot is Online!');
    let handler = require('./command-handler')
    if(handler.default) handler = handler.default
    handler(client)
});

client.login(process.env.TOKEN)