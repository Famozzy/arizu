import { createCommand } from "@/libs"
import { CommandHandler } from "@/types"
import {
  EmbedBuilder,
  Colors,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  ComponentType,
  ButtonBuilder,
  hyperlink,
} from "discord.js"
import { createLinkButton, capitalize, getCommandsCategory } from "@/utils"

// const URLs = {
//   inviteURL: `https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`,
//   tempURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
// };

const handler: CommandHandler = async ({ interaction, client }) => {
  const commands = getCommandsCategory([...client.commands.values()])

  const helpEmbed = new EmbedBuilder()
    .setAuthor({
      name: client.user?.username as string,
      iconURL: client.user?.avatarURL() as string,
    })
    .setColor(Colors.Orange)
    .setDescription(
      "> Browse the commands with using the select menu below or you can find all the commands on the website for more information.",
    )

  const commandMenuOptions = Object.keys(commands).map(category => {
    const commandsOfCategory = commands[category].map(c => c.name).join(", ")
    return {
      label: capitalize(category),
      description: commandsOfCategory,
      value: category,
    }
  })

  const commandMenu = new StringSelectMenuBuilder()
    .setPlaceholder("Browse commands")
    .setCustomId("help-menu")
    .setOptions(commandMenuOptions)

  const buttons = [
    createLinkButton({ label: "Invite me", url: "https://discord.com" }), //invite button
    createLinkButton({ label: "Vote", url: "https://discord.com" }), // vote button
    createLinkButton({ label: "Website", url: "https://discord.com" }), // dashboard button
  ]

  const buttonsRow = new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons)
  const selectMenuRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(commandMenu)

  interaction.reply({
    fetchReply: true,
    embeds: [helpEmbed],
    components: [selectMenuRow, buttonsRow],
  })

  const collector = interaction.channel?.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
    // i stands for interaction
    filter: i => i.user.id === interaction.user.id,
    time: 120000,
  })

  // const tempURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  collector?.on("collect", async interaction => {
    const selectedCategory = interaction.values[0]
    const commandList = commands[selectedCategory]

    const description = commandList
      .map(c => {
        const commandURL = `https://arizu.xyz/commands/${c.name.split(" ").join("-")}`
        return `- ${hyperlink(`\`/${c.name}\``, commandURL)} - ${c.description}`
      })
      .join("\n")

    helpEmbed.setTitle(`${capitalize(selectedCategory)} Command List :`).setDescription(description)
    interaction.update({ embeds: [helpEmbed] })
  })

  collector?.on("end", () => {
    commandMenu.setDisabled(true)
    interaction.editReply({ components: [selectMenuRow] })
  })
}

export default createCommand({
  handler,
  data: {
    name: "help",
    category: "information",
    description: "show commands list",
    // TODO:
    // - add command option with autocomplete
    // options: [
    //   {
    //     name: "command",
    //     description: "command to get help of",
    //     type: ApplicationCommandOptionType.String,
    //   },
    // ],
  },
})
