import { ImageURLOptions, User } from "discord.js"

export default function getUserAvatar(user: User, options: ImageURLOptions = { size: 512 }) {
  return (
    user.displayAvatarURL({
      extension: options.extension ?? "png",
      size: options.size,
    }) || user.defaultAvatarURL
  )
}
