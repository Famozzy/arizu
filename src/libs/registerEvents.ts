import type { Client } from "discord.js"
import { logger } from "@/libs"
import events from "@/events"

const registerEvents = (client: Client) => {
  try {
    for (const event of events) {
      client.on(event.name, event.listener)
    }
    logger.info(`${events.length} Events registered`)
  } catch (error) {
    logger.error(error)
  }
}

export default registerEvents
