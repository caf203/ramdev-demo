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
	} else if (msg.content === '!rorik') {
	  sa
		.get('https://reddit.com/r/rorikroll/random.json')
		.then(res => {
		  console.log(res.statusCode)
		  if (res.statusCode === 200) {
			 msg.channel.createMessage(`Random post: ${res.body[0].data.children[0].data.url}`)
			}
		}).catch(console.error)
	}
})

bot.connect()

