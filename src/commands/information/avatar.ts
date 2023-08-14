import { Colors, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } from "discord.js"
import { CommandHandler } from "@/types"
import { getUserAvatar, createLinkButton } from "@/utils"
import { createCommand } from "@/libs"

const handler: CommandHandler = ({ interaction, args }) => {
  const user = args.getUser("user") ?? interaction.user
  const serverOption = args.getBoolean("server")

  const member = interaction.guild?.members.cache.get(user.id)
  const userAvatarURL = serverOption && member ? getUserAvatar(member) : getUserAvatar(user)
  const button = createLinkButton({ url: userAvatarURL, label: "Download" })
  const row = new ActionRowBuilder<ButtonBuilder>({ components: [button] })

  const avatarEmbed = new EmbedBuilder()
    .setColor(Colors.Orange)
    .setAuthor({ name: `${user.tag}'s Avatar` })
    .setImage(userAvatarURL)

  interaction.reply({ embeds: [avatarEmbed], components: [row] })
}

export default createCommand({
  handler,
  data: {
    name: "avatar",
    category: "information",
    description: "get a user's avatar",
    options: [
      {
        name: "user",
        description: "user to get avatar of",
        type: ApplicationCommandOptionType.User,
      },
      {
        name: "server",
        description: "set to true to get the user's server avatar",
        type: ApplicationCommandOptionType.Boolean,
      },
    ],
  },
})
