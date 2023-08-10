import { EventListener } from "@/types"
import { prisma, logger } from "@/libs"

const onGuildCreate: EventListener<"guildCreate"> = async guild => {
  try {
    const isGuildExist = await prisma.guilds.findFirst({ where: { id: guild.id } })

    if (isGuildExist) return

    await prisma.guilds.create({ data: { id: guild.id } })

    logger.notice(`New guild added: ${guild.id}`)
  } catch (error) {
    logger.error(error)
  }
}

export default onGuildCreate
