import { createCommand } from "@/libs"
import { CommandHandler } from "@/types"
import { GuildMember, EmbedBuilder, time, ApplicationCommandOptionType } from "discord.js"
import { getUserAvatar, getMemberRoles } from "@/utils"

export const handler: CommandHandler = async ({ interaction, args }) => {
  const targetUser = args.getUser("user") ?? interaction.user
  const user = await targetUser.fetch()

  const member = interaction.guild?.members.cache.get(user.id) as GuildMember
  const memberNickname = member.nickname ?? "unset"
  const memberAvatar = getUserAvatar(member.user)
  const memberRoles = getMemberRoles(member)

  const joinedDate = member.joinedAt as Date
  const createdDate = user.createdAt

  const userInfoEmbed = new EmbedBuilder()
    .setColor("Blue")
    .setTitle(`ID: ${user.id}`)
    .setThumbnail(memberAvatar)
    .setTimestamp()
    .addFields([
      { name: "Username", value: user.tag, inline: true },
      { name: "Nickname", value: memberNickname, inline: true },
      { name: "IsBot", value: `${user.bot}`, inline: true },
      { name: "Joined Date", value: time(joinedDate, "F") },
      { name: "Account Created Date", value: time(createdDate, "F") },
      { name: "Role(s)", value: memberRoles },
    ])

  const banner = user.bannerURL({ size: 2048 })
  if (banner) userInfoEmbed.setImage(banner)

  interaction.reply({ embeds: [userInfoEmbed] })
}

export default createCommand({
  handler,
  data: {
    name: "userinfo",
    category: "information",
    description: "get user information",
    options: [
      {
        name: "user",
        description: "user to get information of",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
})
