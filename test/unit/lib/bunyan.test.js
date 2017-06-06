/**
 * bunyan.test.js
 */

/* Node modules */

/* Third-party modules */
import bunyanLib from 'bunyan';

/* Files */
import { expect } from '../../helpers/setup';
import bunyan, { inject } from '../../../src/lib/bunyan';

describe('bunyan tests', function () {

  describe('#inject', function () {

    it('should define the injector', function () {

      expect(inject).to.be.eql({
        name: 'bunyan',
      });

    });

  });

  describe('#factory', function () {

    it('should return the bunyan class', function () {

      expect(bunyan()).to.be.equal(bunyanLib);

    });

  });

});
