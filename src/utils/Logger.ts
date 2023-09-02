import { createLogger, format, transports } from "winston";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const logDirectory = 'src/logs';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const myCustomLevels = {
  levels: {
    aud: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  },
  colors: {
    aud: 'blue',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'white'
  }
};

// Configuración de formato personalizado
const logFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(info => {
    const uuid = uuidv4();
    info.uuid = uuid;
    return JSON.stringify({
      timestamp: info.timestamp,
      level: info.level,
      message: info.message,
      uuid: info.uuid
    });
  })
);

// Transportes para diferentes niveles
const transportsConfig = [
  new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    ),
  }),
  new transports.File({ filename: `${logDirectory}/error.log`, level: 'error' }),
  new transports.File({ filename: `${logDirectory}/warn.log`, level: 'warn' }),
  new transports.File({ filename: `${logDirectory}/info.log`, level: 'info' }),
  new transports.File({ filename: `${logDirectory}/debug.log`, level: 'debug' }),
  new transports.File({ filename: `${logDirectory}/aud.log`, level: 'aud' }),
];

// Agregar transporte de rotación de archivos (opcional)
transportsConfig.push(
  new transports.File({
    filename: `${logDirectory}/combined.log`,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.json()
    ),
  })
);

// Crear el logger con opciones personalizadas
export const Logger = createLogger({
  levels: myCustomLevels.levels,
  format: logFormat,
  transports: transportsConfig,
  exceptionHandlers: [new transports.File({ filename: `${logDirectory}/exceptions.log` })],
  exitOnError: false, // Evitar que el proceso se detenga en caso de excepciones no controladas
});

// Ejemplo de cómo utilizar el logger para hacer debugging
Logger.debug('Esto es un mensaje de debug');