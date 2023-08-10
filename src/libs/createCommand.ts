import type { Command, CommandOptions, SubCommandOptions } from "@/types"

function isSubCommand(command: CommandOptions): command is SubCommandOptions {
  return "subCommands" in command
}

export default function createCommand(command: CommandOptions): Command {
  const { data } = command

  if (isSubCommand(command)) {
    for (const subCommand of command.subCommands) {
      data.options ??= []
      data.options.push({ ...subCommand, type: 1 })
    }
    return { data }
  }

  return { data, run: command.handler }
}
