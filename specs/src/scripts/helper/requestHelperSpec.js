import 'jasmine-ajax';
import request from '../../../../src/scripts/helper/request-helper';

describe('Request Helper', () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = window.fetch;
    jasmine.Ajax.install();
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
    window.fetch = originalFetch;
  });

  it('A', async () => {
    window.fetch = () => Promise.resolve({ json: () => Promise.resolve([]) });
    const url = 'https://dicoding-restaurant-api.el.r.appspot.com/list';
    jasmine.Ajax.stubRequest(url);

    const response = await request.get(url);
    expect(response).toEqual([]);
  });

  it('POST', async () => {
    const expectedResponse = {
      name: 'Budi',
      message: 'Nice menus'
    };
    window.fetch = () =>
      Promise.resolve({ json: () => Promise.resolve(expectedResponse) });
    const url = 'https://dicoding-restaurant-api.el.r.appspot.com/review';
    jasmine.Ajax.stubRequest(url);

    const response = await request.post(url, expectedResponse);
    expect(response).toEqual(expectedResponse);
  });
});
