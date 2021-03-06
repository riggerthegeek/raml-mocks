/**
 * index.test
 */

/* Node modules */

/* Third-party modules */

/* Files */
import { request } from '../../helpers/e2e';

describe('/ e2e tests', function () {

  describe('GET', function () {

    beforeEach(function () {
      this.request = request.get('/');
    });

    it('should return a 404', function () {

      return this.request
        .expect(404);

    });

  });

});
