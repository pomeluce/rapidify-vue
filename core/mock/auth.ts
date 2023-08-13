import { MockMethod } from 'vite-plugin-mock';
import { ApiUrl } from '../../src/enum/ApiUrl';

export default [
  {
    url: '/api/' + ApiUrl.LOGIN,
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: 'token',
      };
    },
  },
] as MockMethod[];
