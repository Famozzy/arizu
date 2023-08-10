import { ApplicationCommandDataResolvable, Client, ApplicationCommandOptionType } from "discord.js"
import commands from "@/commands"
import { checkSubCommandName } from "@/utils"
import { logger } from "@/libs"
import { RegularCommand, Command } from "@/types"

function HasSubCommands(command: Command) {
  return command.data.options?.some(option => option.type === ApplicationCommandOptionType.Subcommand)
}

const registerCommands = async (client: Client) => {
  const slashCommands: ApplicationCommandDataResolvable[] = commands
    // subCommands handler should't be registered as slash commands
    .filter(command => !checkSubCommandName(command.data.name))
    .map(command => command.data)

  const testGuild = process.env.NODE_ENV === "development" ? process.env.TEST_GUILD_ID : ""

  try {
    await client.application?.commands.set(slashCommands, testGuild)
    logger.info(`${slashCommands.length} Commands registered`)

    for (const command of commands as RegularCommand[]) {
      if (!HasSubCommands(command)) client.commands.set(command.data.name, command)
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error)
    }
  }
}

export default registerCommands
