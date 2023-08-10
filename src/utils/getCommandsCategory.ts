import { RegularCommand } from "../types"
import checkSubCommandName from "./checkSubCommandName"

type CommandsCategory = { [key: string]: Array<{ name: string; description: string }> }

export default function getCommandsCategory(commands: RegularCommand[]) {
  return commands.reduce<CommandsCategory>((acc, command) => {
    const { name: commandName, category, description } = command.data
    if (!acc[category]) acc[category] = []

    // if command is a subCommand, remove the ":" from the name
    if (checkSubCommandName(commandName)) {
      acc[category].push({ name: commandName.split(":").join(" "), description })
      return acc
    }

    acc[category].push({ name: commandName, description })
    return acc
  }, {})
}
