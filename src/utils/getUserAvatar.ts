import { ImageURLOptions, User, GuildMember } from "discord.js"

export default function getUserAvatar(user: User | GuildMember, options: ImageURLOptions = { size: 512 }) {
  if (user instanceof User && !user.avatar) return user.defaultAvatarURL
  return user.displayAvatarURL({
    extension: options.extension ?? "png",
    size: options.size,
  })
}
