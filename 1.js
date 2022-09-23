const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [ Intents.FLAGS.GUILDS ], partials: ['CHANNEL'] })
const statics = require('./statics')
require('dotenv').config()

client.once('ready', () => {
    // require('./2') // If you have multiple bots, you can chain them together to work simultaneously
    
    const guild = client.guilds.cache.get(statics.serverId)
    const channels = guild.channels.cache.filter(c => statics.categories.includes(c.parentId));

    let i = 0;
    loop()
    function loop() {
        setTimeout(() => {
            channels.at(i).send(statics.pingRole).catch((err) => console.log(err))

            i++
            if (i == channels.size) i = 0
            
            loop()
        }, statics.timeout)
    }
})

client.login(process.env.TOKEN1)
