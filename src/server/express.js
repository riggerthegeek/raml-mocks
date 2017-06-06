/**
 * express
 */

/* Node modules */
import path from 'path';

/* Third-party modules */

/* Files */

export default ({ Express, expressLib }) => {
  const express = new Express();

  express.set('view engine', 'pug')
    .set('views', path.join(process.cwd(), 'src', 'views'))
    .use('/', expressLib.static(path.join(process.cwd(), 'src', 'public')));

  return express;
};

export const inject = {
  name: 'express',
  deps: [
    'steeplejack-express',
  ],
};
