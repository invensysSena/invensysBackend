import winston from 'winston';
import fs from 'fs';

const logDirectory = 'src/logs';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const myFormat = winston.format.printf(log => {
  return `[Date: ${log.timestamp}] [logId: ${log.logId}] [${log.level}]: ${JSON.stringify(log.message)}`;
});

const myCustomLevels = {
  levels: {
    aud: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red',
    aud: 'magenta',
  },
};

const timeFormat = { format: 'YYYY-MM-DD HH:mm:ss' };

const transports: any = {
    console: new winston.transports.Console({
      level: 'error', // Asegúrate de que el nivel sea 'info'
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(timeFormat),
        myFormat
      ),
    }),
  file: new winston.transports.File({
    level: 'info',
    filename: `${logDirectory}/ms.log`,
    format: winston.format.combine(
      winston.format.timestamp(timeFormat),
      winston.format.json()
    ),
  }),
};

const transportsList = [transports.file];
transportsList.push(transports.console);

winston.addColors(myCustomLevels.colors);

const logger = winston.createLogger({
  levels: myCustomLevels.levels,
  transports: transportsList,
});

export function Logger(userData?: null, ip?: null) {
  let logId = getNanoSecTimeStamp();
  const debug = async function (this: any, ...logData: any) {
    logger.debug({ userData, logId, ip, message: logData });
  };
  const info = async function (this: any, ...logData: any) {
    logger.info({ userData, logId, ip, message: logData });
  };
  const warn = async (...logData: any) => {
    logger.warn({ userData, logId, ip, message: logData });
  };
  const error = async (...logData: any) => {
    logger.error({ userData, logId, ip, message: logData });
  };

  return { debug, info, warn, error };
}

function getNanoSecTimeStamp() {
  const hrTime = process.hrtime();
  return hrTime[0] * 1000000000 + hrTime[1];
}
