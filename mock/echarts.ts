import { MockMethod } from 'vite-plugin-mock';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { ApiUrl } from '../src/enum/ApiUrl';

const weekday = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

export default [
  {
    url: '/api/' + ApiUrl.DASHBOARD_LIST,
    method: 'get',
    response: () => {
      const data = [
        ['product', '访问差值', '本周访问', '上周访问'],
        ...Array.from({ length: 7 }, (_, index) => {
          const preWeekNumber = faker.number.int({ min: 0, max: 99999 });
          const currentWeekNumber = faker.number.int({ min: 0, max: 99999 });
          const difference = Math.abs(currentWeekNumber - preWeekNumber);
          return [weekday[index], difference, currentWeekNumber, preWeekNumber];
        }),
      ];
      return {
        code: 200,
        message: 'success',
        data,
      };
    },
  },
] as MockMethod[];
