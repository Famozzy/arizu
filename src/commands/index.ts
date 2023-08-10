import { Command } from "@/types"
import * as informationCommands from "./information"
import * as moderationCommands from "./moderation"
import * as funCommands from "./fun"

const commands = Object.values<Command>({
  ...informationCommands,
  ...moderationCommands,
  ...funCommands,
})

export default commands
