const client = require('..')
const { EmbedBuilder, PermissionsBitField, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder} = require('discord.js');

client.on('interactionCreate', async interaction => {
    const slashCommand = client.slashCommands.get(interaction.commandName);
    if(interaction.type === 2) {// Slashcommand (normal)
        if(!slashCommand) return client.slashCommands.delete(interaction.commandName);
        try {
            await interaction.deferReply({ ephemeral: true });
            const args = [];
            for (let option of interaction.options.data) {
                if (option.type === 1) {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }
            interaction.member = interaction.guild.members.cache.get(interaction.user.id);
            if(slashCommand.userPerms || slashCommand.botPerms) {
                if(!interaction.memberPermissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                    const userPerms = new EmbedBuilder()
                        .setDescription(`❌ ${interaction.user}, You don't have \`${slashCommand.userPerms}\` permissions to use this Command!`)
                        .setColor('Red');
                    return interaction.reply({ embeds: [userPerms] })
                }
                if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))){
                    const botPerms = new EmbedBuilder()
                        .setDescription(`❌ ${interaction.user}, I don't have \`${slashCommand.botPerms}\` permissions to use this command!`)
                        .setColor('Red');
                    return interaction.reply({ embeds: [botPerms] })
                }
            }
            await slashCommand.run(client, interaction, args);
        } catch (error) {
            client.logger.error(error);
        }
    } else if(interaction.type === 3) { // Buttons

    } else if(interaction.type === 4) { // Slashcommand (autocomplete)
        if(slashCommand.autocomplete) {
            const choices = [];
            await slashCommand.autocomplete(interaction.choices)
        }
    } else if(interaction.type === 5) { // Modal
    } else {
        return client.logger.warn("Interaction with unsupported type (" + interaction.type + ") recieved.");
    }
});


/*
############################################################################
#                    Command Handler v14 Template                          #
#               https://github.com/nilasystem/command-handler-v14/         #
############################################################################
*/