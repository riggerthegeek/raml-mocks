/**
 * app.test
 */

/* Node modules */

/* Third-party modules */
import express from '@steeplejack/express';

/* Files */
import { expect, proxyquire, sinon } from '../helpers/setup';

describe('app tests', function () {

  it('should configure the app bootstrapping', function () {
    const config = {
      server: 'serverObj',
    };
    const env = 'envvars';

    const steeplejackInst = {
      run: sinon.stub(),
    };

    const steeplejack = {
      app: sinon.stub()
        .returns(steeplejackInst),
    };

    const app = proxyquire('./src/app', {
      steeplejack,
      './config.json': config,
      './envvars.json': env,
    }).default;

    expect(app).to.be.equal(steeplejackInst);

    expect(steeplejack.app).to.be.calledOnce
      .calledWithExactly({
        config,
        env,
        logger: '$logger',
        modules: [
          `${process.cwd()}/src/!(node_modules|public|routes|scripts|styles)/**/*.js`,
          express,
        ],
        routesDir: `${process.cwd()}/src/routes`,
      });

    expect(steeplejackInst.run).to.be.calledOnce
      .calledWith([
        'server',
      ]);

    const run = steeplejackInst.run.args[0][1];

    expect(run).to.be.a('function');

    const server = {};

    expect(run(server)).to.be.equal(server);
  });

});
