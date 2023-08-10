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
  const [userAvatarBuffer, kneelFrameBuffer] = await Promise.all([
    sharp(userAvatar).resize(124, 138).toBuffer(),
    sharp("./assets/image/kneeling.png").resize(447, 343).toBuffer(),
  ])

  // process the images
  const kneelImage = await sharp({
    create: { width: 447, height: 343, channels: 4, background: "#000000" },
  })
    .composite([{ input: userAvatarBuffer, top: 26, left: 16 }, { input: kneelFrameBuffer }])
    .png()
    .toBuffer()

  const kneelResult = new AttachmentBuilder(kneelImage, { name: "kneeling.png" })

  const kneelEmbed = new EmbedBuilder()
    .setColor("Random")
    .setTitle(`${user.tag}  🙏🙏`)
    .setImage("attachment://kneeling.png")

  interaction.editReply({ embeds: [kneelEmbed], files: [kneelResult] })
}

export default createCommand({
  handler,
  data: {
    name: "meme:kneeling",
    category: "fun",
    description: "kneeling someone",
    options: [
      {
        name: "user",
        description: "user to kneel",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
})
