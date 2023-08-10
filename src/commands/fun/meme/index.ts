import { createCommand } from "@/libs"
import { subCommandDataResolver } from "@/utils"

import kneeling from "./kneeling"
import triggered from "./triggered"

const memeCommands = createCommand({
  data: {
    name: "meme",
    category: "fun",
    description: "meme commands",
  },
  subCommands: subCommandDataResolver(kneeling, triggered /* ... */),
})

export { memeCommands, kneeling, triggered }
