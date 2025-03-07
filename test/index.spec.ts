import { withCookieChimpCMP } from '../src';

describe('index', () => {
  describe('withCookieChimpCMP', () => {
    it('should create a wrapper with default options', () => {
      const mockAnalytics = {
        load: jest.fn(),
        track: jest.fn(),
        page: jest.fn(),
        identify: jest.fn(),
        group: jest.fn(),
      };

      const wrapper = withCookieChimpCMP(mockAnalytics);
      expect(wrapper).toBeDefined();
    });
  });
});
