import { GuildMember } from "discord.js"

export default function getMemberRoles(member: GuildMember) {
  const roles: string[] = member?.roles.cache.map(role => role.name).slice(0, -1)
  return roles.length ? roles.join(", ") : "None"
}
