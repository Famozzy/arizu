import { createCommand } from "@/libs"
import { CommandHandler } from "@/types"
import { Colors, EmbedBuilder } from "discord.js"

const handler: CommandHandler = async ({ interaction }) => {
  await interaction.deferReply()
  const message = interaction.channel?.lastMessage
  const memberMessageTimestamp = message?.createdTimestamp as number
  const timestamp = memberMessageTimestamp - interaction.createdTimestamp

  const pingEmbed = new EmbedBuilder().setColor(Colors.Green).setAuthor({
    name: ` • 🏓Pong! : ${Math.floor(timestamp)}ms`,
  })

  interaction.editReply({ embeds: [pingEmbed] })
}

export default createCommand({
  handler,
  data: {
    name: "ping",
    category: "information",
    description: "get the arizu's ping",
  },
})
