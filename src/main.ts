import { initClient } from "./libs"
import { Partials } from "discord.js"

const arizu = initClient({
  intents: [
    "GuildMessages",
    "Guilds",
    "GuildMessageReactions",
    "GuildMessageTyping",
    "DirectMessages",
    "DirectMessageReactions",
    "DirectMessageTyping",
  ],
  partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User, Partials.Reaction],
})

arizu.login(process.env.DISCORD_TOKEN)
