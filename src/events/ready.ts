import { ActivityType } from "discord.js"
import { EventListener } from "@/types"
import { logger } from "@/libs"

const onReady: EventListener<"ready"> = async client => {
  const shardId = client.shard?.ids ?? 0

  logger.info(`${client.user.tag} has online! (shard ${shardId})`)
  logger.info(`watching ${client.guilds.cache.size} guilds! (shard ${shardId})`)

  let i = 0
  const interval = 60 * 1000
  const activities = ["/help", "with my mastah", "YNTKTS"]

  setInterval(() => {
    if (i == activities.length) i = 0
    client.user.setActivity(activities[i++], { type: ActivityType.Playing })
  }, interval)
}

export default onReady
