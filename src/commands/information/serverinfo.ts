import { createCommand } from "@/libs"
import { CommandHandler } from "@/types"
import { Guild, EmbedBuilder } from "discord.js"

const handler: CommandHandler = async ({ interaction, client }) => {
  const guild = interaction.guild as Guild
  const ownerGuild = await interaction.guild?.fetchOwner()

  const serverInfoEmbed = new EmbedBuilder()
    .setAuthor({ name: `Server : ${guild.name}` })
    .addFields([{ name: "Owner : ", value: ownerGuild?.user.tag || "Unknown" }])
    .setFooter({ text: "Arizu", iconURL: client.user?.displayAvatarURL() })
    .setThumbnail(guild.iconURL())
    .setColor("Aqua")
    .setTimestamp()

  interaction.reply({ embeds: [serverInfoEmbed] })
}

export default createCommand({
  handler,
  data: {
    name: "serverinfo",
    category: "information",
    description: "Get server information",
  },
})
