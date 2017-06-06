/**
 * logger
 */

/* Node modules */

/* Third-party modules */

/* Files */

export default (bunyan, Logger, config) => {
  const types = Logger.getLogLevels();

  const streams = [];

  if (config.logging.streams.stdout.active) {
    streams.push({
      level: config.logging.streams.stdout.level,
      stream: process.stdout,
    });
  }

  const logger = bunyan.createLogger({
    name: config.logging.name,
    streams,
  });

  const strategy = types.reduce((result, type) => {
    result[type] = (...args) => logger[type](...args);

    return result;
  }, {});

  return new Logger(strategy);
};

export const inject = {
  name: '$logger',
  deps: [
    'bunyan',
    'steeplejack-logger',
    '$config',
  ],
};
