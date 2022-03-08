import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export function StubUse(instance: AxiosInstance) {
  let Stub = new MockAdapter(instance);

  Stub.onGet('test/200/response').reply(200, {
    code: 200,
    message: 'ok',
  });
  Stub.onGet('test/400/response').reply(400, {
    code: 400,
    message: 'bad request',
  });
  Stub.onGet('test/403/response').reply(403, {
    code: 403,
    message: 'No access',
  });
  Stub.onGet('test/500/response').reply(500, {
    code: 500,
    message: 'server error',
  });

  Stub.onGet('test/timeout/response').timeout();

  Stub.onPost('test/200/response').reply(200, {
    code: 200,
    message: 'ok',
  });
  Stub.onPost('test/400/response').reply(400, {
    code: 400,
    message: 'bad request',
  });
  Stub.onPost('test/403/response').reply(403, {
    code: 403,
    message: 'No access',
  });
  Stub.onPost('test/500/response').reply(500, {
    code: 500,
    message: 'server error',
  });

  Stub.onPost('test/timeout/response').timeout();
}
