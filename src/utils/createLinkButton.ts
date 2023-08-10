import { ButtonBuilder, ButtonStyle } from "discord.js"

export default function createLinkButton(options: { label: string; url: string }) {
  return new ButtonBuilder({ style: ButtonStyle.Link, ...options })
}
