import { EventListener } from "@/types"

const onGuildMemberAdd: EventListener<"guildMemberAdd"> = async member => {
  console.log(member)

  // TODO:
  // fetch guild document

  // WELCOME MESSAGE
  // check the guild welcome is active or not
  // check the welcome channel is exists or not
  // send welcome message

  // AUTOROLE
  // check the guild autorole is active or not
  // check the autorole is exists or not
}

export default onGuildMemberAdd
