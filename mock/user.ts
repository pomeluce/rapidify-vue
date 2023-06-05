import { MockMethod } from 'vite-plugin-mock';
import { ApiUrl } from '../src/enum/ApiUrl';

export default [
  {
    url: '/api/' + ApiUrl.CURRENT_USER,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: 1001,
          name: 'Rapidify',
          email: 'rapidify@gmail.com',
          gender: 1,
          avatar: '/images/avatar.png',
          phone: '18888888888',
          createTime: '2021-01-01 12:00:00',
          updateTime: '2021-01-01 12:00:00',
        },
      };
    },
  },
] as MockMethod[];
