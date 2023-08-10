import { Collection } from "discord.js"
import { RegularCommand } from "@/types"

declare module "discord.js" {
  export interface Client {
    commands: Collection<string, RegularCommand>
  }
}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: "development" | "production"
      DISCORD_TOKEN: string
      TEST_GUILD_ID: string
    }
  }
}

export {}
