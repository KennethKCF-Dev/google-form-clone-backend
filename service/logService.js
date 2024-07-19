const winston = require('winston');

const { combine, timestamp, json, printf, colorize } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: timestampFormat }),
        json(),
        printf(({ timestamp, level, message}) => `[${timestamp}] ${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console()
    ],
});

module.exports = {
    logger
};