import type {
  Client,
  CommandInteraction,
  CommandInteractionOptionResolver,
  ChatInputApplicationCommandData,
  ApplicationCommandSubCommandData,
} from "discord.js"

export type SubCommandData = Omit<ApplicationCommandSubCommandData, "type">

export interface CommandData extends ChatInputApplicationCommandData {
  category: string
}

export interface CommandHandlerOptions {
  client: Client
  interaction: CommandInteraction
  args: CommandInteractionOptionResolver
}

export interface CommandHandler {
  (options: CommandHandlerOptions): Promise<void> | void
}

export interface RegularCommandOptions {
  data: CommandData
  handler: CommandHandler
}

export interface SubCommandOptions {
  data: CommandData
  subCommands: SubCommandData[]
}

export type CommandOptions = RegularCommandOptions | SubCommandOptions

export interface SubCommand {
  data: CommandData
}

export interface RegularCommand {
  data: CommandData
  run: CommandHandler
}

export type Command = RegularCommand | SubCommand
