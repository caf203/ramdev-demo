const Eris = require('eris')

require('dotenv').config()

const bot = new Eris(process.env.BOT_TOKEN)

bot.on('ready', () => {
  console.log(`Connected and ready! I am ${bot.user.username}#${bot.user.discriminator}, in ${bot.guilds.size} servers.`)
})

bot.on('messageCreate', (msg) => {
	console.log(msg)
	const start = new Date().getTime()
  if (msg.content === '!ping') {
    msg.channel.createMessage('Pong!').then(e => {
		  e.edit(`Done. RTT: ${new Date().getTime() - start}`)
		})
	}
})

bot.connect()

