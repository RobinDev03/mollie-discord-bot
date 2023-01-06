const config = require('./config/config.json');

const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
});

client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection();
client.config = config;
client.prefix = config.prefix;
client.logger = require('./modules/logger');

module.exports = client;

['slashCommand', 'events'].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

client.login(config.discord.token).then();

client.on("error", (e) => client.logger.error(e));
client.on("warn", (e) => client.logger.warn(e));
client.on("debug", (e) => client.logger.debug(e));



/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/