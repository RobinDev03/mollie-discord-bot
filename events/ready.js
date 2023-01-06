const client = require('..')
const chalk = require('chalk')


client.on("ready", () => {
    console.log(chalk.red("############################################################################"))
    console.log(chalk.red(`#                  Logged in as ${client.user.tag}                         #`))
    console.log(chalk.red("############################################################################"))
    client.logger.ready("https://discord.com/api/oauth2/authorize?client_id="+client.user.id+"&permissions=8&scope=applications.commands%20bot")
})

/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/