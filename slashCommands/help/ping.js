const { ApplicationCommandType} = require('discord.js');
module.exports = {
    name: 'ping',
    description: "Ping",
    type: ApplicationCommandType.ChatInput,
    default_permissions: [],
    default_member_permissions: [],
    run: async (client, interaction, args) => {
        interaction.reply("Pong")
    }
};