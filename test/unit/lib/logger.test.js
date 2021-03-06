/**
 * logger.test.js
 */

/* Node modules */

/* Third-party modules */

/* Files */
import { expect, sinon } from '../../helpers/setup';
import logger, { inject } from '../../../src/lib/logger';

describe('logger tests', function () {

  describe('#inject', function () {

    it('should define the injector', function () {

      expect(inject).to.be.eql({
        name: '$logger',
        deps: [
          'bunyan',
          'steeplejack-logger',
          '$config',
        ],
      });

    });

  });

  describe('#factory', function () {

    beforeEach(function () {
      this.bunyan = {
        createLogger: sinon.stub(),
      };

      this.Logger = sinon.stub();
      this.Logger.getLogLevels = sinon.stub()
        .returns([
          'level1',
          'level2',
        ]);

      this.config = {
        logging: {
          name: 'logName',
          streams: {
            stdout: {
              active: true,
              level: 'logStdOutLevel',
            },
          },
        },
      };
    });

    it('should return the Logger class - stdout active', function () {
      const inst = {};
      const bunyanInst = {
        level1: sinon.stub().returns('l1Result'),
        level2: sinon.stub().returns('l2Result'),
      };

      this.bunyan.createLogger.returns(bunyanInst);
      this.Logger.returns(inst);

      expect(logger(this.bunyan, this.Logger, this.config)).to.be.equal(inst);

      expect(this.bunyan.createLogger).to.be.calledOnce;

      const args = this.bunyan.createLogger.args[0][0];
      expect(args.name).to.be.equal('logName');
      expect(args.streams).to.have.length(1);

      expect(args.streams[0]).to.be.eql({
        level: 'logStdOutLevel',
        stream: process.stdout,
      });

      expect(this.Logger).to.be.calledOnce
        .calledWithNew;

      const strategy = this.Logger.args[0][0];

      expect(strategy).to.have.keys([
        'level1',
        'level2',
      ]);

      expect(strategy.level1('l11', 'l12', 'l13')).to.be.equal('l1Result');
      expect(strategy.level2('l21', 'l22', 'l23')).to.be.equal('l2Result');

      expect(bunyanInst.level1).to.be.calledOnce
        .calledWithExactly('l11', 'l12', 'l13');

      expect(bunyanInst.level2).to.be.calledOnce
        .calledWithExactly('l21', 'l22', 'l23');
    });

    it('should return the Logger class - stdout inactive', function () {
      this.config.logging.streams.stdout.active = false;

      const inst = {};
      const bunyanInst = {
        level1: sinon.stub().returns('l1Result'),
        level2: sinon.stub().returns('l2Result'),
      };

      this.bunyan.createLogger.returns(bunyanInst);
      this.Logger.returns(inst);

      expect(logger(this.bunyan, this.Logger, this.config)).to.be.equal(inst);

      const args = this.bunyan.createLogger.args[0][0];
      expect(args.name).to.be.equal('logName');
      expect(args.streams).to.have.length(0);

      expect(this.Logger).to.be.calledOnce
        .calledWithNew;

      const strategy = this.Logger.args[0][0];

      expect(strategy).to.have.keys([
        'level1',
        'level2',
      ]);

      expect(strategy.level1('l11', 'l12', 'l13')).to.be.equal('l1Result');
      expect(strategy.level2('l21', 'l22', 'l23')).to.be.equal('l2Result');

      expect(bunyanInst.level1).to.be.calledOnce
        .calledWithExactly('l11', 'l12', 'l13');

      expect(bunyanInst.level2).to.be.calledOnce
        .calledWithExactly('l21', 'l22', 'l23');
    });

  });

});
