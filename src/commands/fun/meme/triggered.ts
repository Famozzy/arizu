import { createCommand } from "@/libs"
import { CommandHandler } from "@/types"
import { getUserAvatar } from "@/utils"
import { ApplicationCommandOptionType, AttachmentBuilder, EmbedBuilder } from "discord.js"
import sharp from "sharp"
import axios from "axios"

const handler: CommandHandler = async ({ interaction, args }) => {
  const user = args.getUser("user") ?? interaction.user
  const userAvatarURL = getUserAvatar(user)
  const userAvatar = (await axios.get<ArrayBuffer>(userAvatarURL, { responseType: "arraybuffer" })).data

  // defer the reply
  await interaction.deferReply()

  // load the images
  const frames = await Promise.all([
    sharp(userAvatar).resize(400, 400).toBuffer(),
    sharp("./assets/image/triggered.png").resize(400, 400).toBuffer(),
  ])

  // process the images
  const triggeredImage = await sharp({
    create: { width: 400, height: 400, channels: 4, background: "#000000" },
  })
    .composite(frames.map(frame => ({ input: frame })))
    .png()
    .toBuffer()

  const triggeredResult = new AttachmentBuilder(triggeredImage, { name: "triggered.png" })

  const triggeredEmbed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(`${user.tag}  🤬`)
    .setImage("attachment://triggered.png")

  interaction.editReply({ embeds: [triggeredEmbed], files: [triggeredResult] })
}

export default createCommand({
  handler,
  data: {
    name: "meme:triggered",
    category: "fun",
    description: "triggered someone",
    options: [
      {
        name: "user",
        description: "user to triggered",
        type: ApplicationCommandOptionType.User,
      },
    ],
  },
})
