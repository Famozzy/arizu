import ready from "./ready"
import guildCreate from "./guildCreate"
import interactionCreate from "./interactionCreate"
import guildMemberAdd from "./guildMemberAdd"

const events = [
  { name: "ready", listener: ready },
  { name: "guildCreate", listener: guildCreate },
  { name: "guildMemberAdd", listener: guildMemberAdd },
  { name: "interactionCreate", listener: interactionCreate },
]

export default events
