import { Command, SubCommandData } from "@/types"

export default function subCommandDataResolver(...commands: Command[]) {
  return commands.map(({ data: command }) => ({
    name: command.name.split(":").at(1),
    description: command.description,
    options: command.options ?? [],
  })) as SubCommandData[]
}
