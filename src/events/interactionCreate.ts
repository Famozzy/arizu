import { EventListener } from "@/types"
import { logger } from "@/libs"
import { CommandInteractionOptionResolver } from "discord.js"

const onInteractionCreate: EventListener<"interactionCreate"> = async interaction => {
  try {
    if (interaction.user.bot) return

    if (interaction.isCommand()) {
      const { client, options, commandName } = interaction
      const args = options as CommandInteractionOptionResolver

      const subCommandName = args.getSubcommand(false)
      const resolvedCommandName = subCommandName ? `${commandName}:${subCommandName}` : commandName

      const command = client.commands.get(resolvedCommandName)
      command?.run({ client, interaction, args })
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message)
    }
  }
}

export default onInteractionCreate
