const { createLogger, format, transports } = require('winston');
const { combine, timestamp, lable, printf } = format;

const customeFormat = printf(( { level,message,timestamp })=>{
  return `${timestamp}  : ${level} : ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
    customeFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename: 'combined.log'})
  ],
});

module.exports = logger;