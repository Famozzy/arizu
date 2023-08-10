import { ShardingManager } from "discord.js"
import { logger } from "./libs"
import path from "path"

if (process.env.NODE_ENV !== "production") throw new Error("NODE_ENV is not production!")

const mainJsPath = path.resolve(__dirname, "main.js")

const manager = new ShardingManager(mainJsPath, {
  totalShards: "auto",
  token: process.env.DISCORD_TOKEN,
})

manager.on("shardCreate", shard => {
  logger.info(`Launched shard ${shard.id}[${shard.id + 1} of ${manager.totalShards}]`)
})

manager.spawn()
