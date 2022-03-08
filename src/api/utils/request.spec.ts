import { get, post, IResponse } from './request';

describe('request response test', () => {
  it('get response ok status', async () => {
    const res = await get('/test/200/response');
    expect(res.code).toEqual(200);
  });
  it('get response error 400 status', async () => {
    const res = await get('/test/400/response');
    expect(res.code).toEqual(400);
  });
  it('get response error 403 status', async () => {
    const res = await get('/test/403/response');
    expect(res.code).toEqual(403);
  });
  it('get response error 500 status', async () => {
    const res = await get('/test/500/response');
    expect(res.code).toEqual(500);
  });

  it('get response timeout', async () => {
    const res = await get('/test/timeout/response');
    expect(res.code).toEqual(504);
  });

  it('post response ok status', async () => {
    const res = await post('/test/200/response');
    expect(res.code).toEqual(200);
  });
  it('post response error 400 status', async () => {
    const res = await post('/test/400/response');
    expect(res.code).toEqual(400);
  });
  it('post response error 403 status', async () => {
    const res = await post('/test/403/response');
    expect(res.code).toEqual(403);
  });
  it('post response error 500 status', async () => {
    const res = await post('/test/500/response');
    expect(res.code).toEqual(500);
  });

  it('post response timeout', async () => {
    const res = await post('/test/timeout/response');
    expect(res.code).toEqual(504);
  });
});
