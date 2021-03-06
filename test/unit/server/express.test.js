/**
 * express.test.js
 */

/* Node modules */
const path = require('path');

/* Third-party modules */

/* Files */
const { expect, sinon } = require('../../helpers/setup');
const factory = require('../../../src/server/express');

const server = factory.default;
const inject = factory.inject;

describe('express tests', function () {

  describe('#inject', function () {

    it('should define the injector', function () {

      expect(inject).to.be.eql({
        name: 'express',
        deps: [
          'steeplejack-express',
        ],
      });

    });

  });

  describe('#factory', function () {

    beforeEach(function () {
      this.config = {
        server: 'serverConfig',
      };

      this.expressInst = {
        set: sinon.stub(),
        use: sinon.stub(),
      };

      this.expressInst.set.returns(this.expressInst);
      this.expressInst.use.returns(this.expressInst);

      this.express = {
        Express: sinon.stub()
          .returns(this.expressInst),
        expressLib: {
          static: sinon.stub().returns('staticResult'),
        },
      };
    });

    it('should configure Express instance with Pug and static directory', function () {
      const obj = server(this.express);

      expect(obj).to.be.equal(this.expressInst);

      expect(this.express.Express).to.be.calledOnce
        .calledWithNew
        .calledWithExactly();

      expect(this.expressInst.set).to.be.calledTwice
        .calledWithExactly('view engine', 'pug')
        .calledWithExactly('views', path.join(process.cwd(), 'src', 'views'));

      expect(this.expressInst.use).to.be.calledOnce
        .calledWithExactly('/', 'staticResult');

      expect(this.express.expressLib.static).to.be.calledOnce
        .calledWithExactly(path.join(process.cwd(), 'src', 'public'));

    });

  });

});
