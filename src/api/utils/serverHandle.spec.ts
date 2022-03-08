import { IResponse } from './request';
import { isValid } from './serverHandle';
describe('server response handler', () => {
  describe('isValid', () => {
    it('should handler response return, if res.code equal 200, then return true', () => {
      const res: IResponse = {
        code: 200,
        message: 'ok',
      };

      expect(isValid(res)).toEqual(true);
    });
  });
});
