/**
 * server.test.js
 */

/* Node modules */

/* Third-party modules */

/* Files */
import { expect, sinon } from '../../helpers/setup';
import server, { inject } from '../../../src/server/server';

describe('server tests', function () {

  describe('#inject', function () {

    it('should define the injector', function () {

      expect(inject).to.be.eql({
        name: 'server',
        deps: [
          'steeplejack-server',
          '$config',
          'express',
        ],
      });

    });

  });

  describe('#factory', function () {

    beforeEach(function () {
      this.config = {
        server: 'serverConfig',
      };

      this.expressInst = {};

      this.serverInst = {};
      this.Server = sinon.stub()
        .returns(this.serverInst);
    });

    it('should create a server and configure Express as the strategy', function () {
      const obj = server(this.Server, this.config, this.expressInst);

      expect(obj).to.be.equal(this.serverInst);

      expect(this.Server).to.be.calledOnce
        .calledWithNew
        .calledWithExactly('serverConfig', this.expressInst);
    });

  });

});
