import { MockMethod } from 'vite-plugin-mock';
import { ApiUrl } from '../src/enum/ApiUrl';

export default [
  {
    url: '/api/' + ApiUrl.UPLOAD_IMAGE,
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: '/src/assets/images/avatar.png',
      };
    },
  },
] as MockMethod[];
