import { createLogger, format, transports } from "winston"

const timestamp = new Date().toLocaleString()
const loggerFormat = format.printf(({ level, message }) => `[${level.toUpperCase()}] ${timestamp} : ${message}`)

const logger = createLogger({
  format: loggerFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/all.log" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
})

export default logger
