/**
 * app
 *
 * Generate a mocked API from your RAML definition
 *
 * Built with Steeplejack
 *
 * @link https://getsteeplejack.com
 */

/* Node modules */

/* Third-party modules */
import Steeplejack from 'steeplejack';
import express from '@steeplejack/express';

/* Files */
import config from './config.json';
import env from './envvars.json';

/* Bootstrap the Steeplejack app */
const app = Steeplejack.app({
  config,
  env,
  logger: '$logger',
  modules: [
    `${__dirname}/!(node_modules|public|routes|scripts|styles)/**/*.js`,
    express,
  ],
  routesDir: `${__dirname}/routes`,
});

/* Load up the server */
app.run(['server'], server => server);

export default app;
