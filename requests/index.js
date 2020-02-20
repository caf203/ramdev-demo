const Eris = require('eris')
const sa = require('superagent')

require('dotenv').config()

const bot = new Eris(process.env.BOT_TOKEN)

bot.on('ready', () => {
  console.log(`Connected and ready! I am ${bot.user.username}#${bot.user.discriminator}, in ${bot.guilds.size} servers.`)
})

bot.on('messageCreate', (msg) => {
	const start = new Date().getTime()
  if (msg.content === '!ping') {
    msg.channel.createMessage('pong.').then(e => {
		  e.edit(`Done. RTT: ${new Date().getTime() - start}`)
		})
	} else if (msg.content === '!chuck') {
	  sa
		.get('https://api.chucknorris.io/jokes/random')
		.then(res => {
		  console.log(res.statusCode, res)
		  if (res.statusCode === 200) {
			 msg.channel.createMessage({embed: {thumbnail: { url: res.body.icon_url }, description: res.body.value}})
			}
		}).catch(console.error)
	}
})

bot.connect()

