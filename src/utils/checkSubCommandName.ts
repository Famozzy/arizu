export default function checkSubCommandName(commandName: string) {
  return /^[a-z]+:[a-z]+$/.test(commandName)
}
