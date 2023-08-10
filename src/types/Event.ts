import type { ClientEvents } from "discord.js"

export interface EventListener<T extends keyof ClientEvents> {
  (...args: ClientEvents[T]): Promise<void>
}
