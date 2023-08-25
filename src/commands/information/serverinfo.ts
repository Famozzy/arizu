import { createCommand } from "@/libs"
import { CommandHandler } from "@/types"
import { Guild, EmbedBuilder, GuildMember, time } from "discord.js"

const handler: CommandHandler = async ({ interaction, client }) => {
  const guild = interaction.guild as Guild
  const ownerGuild = (await interaction.guild?.fetchOwner()) as GuildMember
  const boostCount = guild.premiumSubscriptionCount
  const boostLevel = guild.premiumTier

  const emojis = guild.emojis.cache.map(emoji => emoji.toString())

  const displayEmojis =
    emojis.join(" ").length > 1024 ? emojis.slice(0, 30).join(" ") + "  and more..." : emojis.join(" ")

  const serverInfoEmbed = new EmbedBuilder()
    .setAuthor({ name: `${guild.name} (${guild.id})` })
    .addFields([
      { name: "Owner", value: ownerGuild.user.tag, inline: true },
      { name: "Roles", value: guild.roles.cache.size.toString(), inline: true },
      { name: "Channels", value: guild.channels.cache.size.toString(), inline: true },
      { name: "Members", value: guild.memberCount.toString(), inline: true },
      { name: "Boost level", value: `Level ${boostLevel}  (${boostCount} boosts)`, inline: true },
      { name: "Created at", value: time(guild.createdAt).toString() },
      { name: `Emojis [${emojis.length}]`, value: emojis.length ? displayEmojis : "None" },
    ])
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
