/**
 * server
 */

/* Node modules */

/* Third-party modules */

/* Files */

export default (Server, config, express) =>
  new Server(config.server, express);

export const inject = {
  name: 'server',
  deps: [
    'steeplejack-server',
    '$config',
    'express',
  ],
};
