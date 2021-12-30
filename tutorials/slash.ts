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
	console.log('Ready!');

    const guildId = '924183373818261524'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if(guild) {
        commands = guild.commands
    }else{
        commands = client.application?.commands
    }

    commands?.create({
        name:'ping',
        description: 'test ping'
    })

    commands?.create({
        name:'add',
        description: 'add two numbers',
        options:[
            {
                name:'num1',
                description: 'Enter first number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name:'num2',
                description: 'Enter second number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
    })
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()){
        return
    }

    const { commandName, options } = interaction
    if(commandName === 'ping'){
        interaction.reply({
            content:'pong',
            ephemeral:true
        })
    }else if(commandName === 'add'){
        const num1 = options.getNumber('num1')!
        const num2 = options.getNumber('num2')!

        await interaction.deferReply({
            ephemeral:true
        })

        await new Promise((resolve) => setTimeout(resolve,5000))

        interaction.editReply({
            content:`Sum of ${num1} and ${num2} is ${num1 +num2}`
        })
    }
})

client.login(process.env.TOKEN)