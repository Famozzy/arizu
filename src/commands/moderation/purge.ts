import { createCommand } from "@/libs"
import { ApplicationCommandOptionType, TextChannel } from "discord.js"
import { Emoji } from "@/utils"
import { CommandHandler } from "@/types"

const handler: CommandHandler = async ({ interaction, args }) => {
  const amount = args.getNumber("amount", true)
  const channel = interaction.channel as TextChannel

  try {
    await interaction.reply({ content: `${Emoji.Process} Purging...`, ephemeral: true })

    const messages = await channel.messages.fetch({ limit: amount })
    console.log(messages.size)

    const deleted = await channel.bulkDelete(messages)

    if (!deleted.size) throw new Error("No messages were deleted")

    interaction.editReply(`${Emoji.Success} Messages successfully purged`)
  } catch (err) {
    if (err instanceof Error) interaction.editReply(`${Emoji.Failed} ${err.message}`)
    else interaction.editReply(`${Emoji.Failed} An error occured while purging messages`)
  }
}

export default createCommand({
  handler,
  data: {
    name: "purge",
    category: "moderation",
    description: "purge a messages",
    defaultMemberPermissions: ["Administrator"],
    dmPermission: false,
    options: [
      {
        name: "amount",
        description: "amount of messages to delete",
        required: true,
        min_value: 1,
        max_value: 100,
        type: ApplicationCommandOptionType.Number,
      },
    ],
  },
})
