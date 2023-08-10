import { Client as DiscordClient, Collection, ClientOptions } from "discord.js"
import { RegularCommand } from "@/types"
import registerEvents from "./registerEvents"
import registerCommands from "./registerCommands"

export default function initClient(options: ClientOptions) {
  const client = new DiscordClient(options)

  client.commands = new Collection<string, RegularCommand>()
  client.once("ready", registerCommands)
  registerEvents(client)
  return client
}
