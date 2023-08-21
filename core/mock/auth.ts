import { MockMethod } from 'vite-plugin-mock';
import { faker } from '@faker-js/faker/locale/zh_CN';
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
  {
    url: '/api/' + ApiUrl.CAPTCHA,
    method: 'post',
    response: ({ body }) => {
      const { width, height, length } = body;
      const maxX = width - length * 4;
      const maxY = height - length * 4;
      // 获取坐标范围
      const startX = Math.floor(Math.random() * maxX + length * 2);
      const startY = Math.floor(Math.random() * maxY + length * 2);
      const radius = length / 5;
      const src = '/src/assets/images/' + faker.helpers.arrayElement(['dragVerify1.png', 'dragVerify2.png']);
      return {
        code: 200,
        message: '滑块验证码位置获取成功',
        data: { width, height, startX, startY, length, radius, src },
      };
    },
  },
] as MockMethod[];
