import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

/* 用户访问量 */
export const assess = (data: Array<Array<any>>): EChartsOption => {
  return {
    animationDuration: 5000,
    color: ['#0066FF', '#0066FF', '#cae2fd'],
    dataset: {
      source: data,
    },
    legend: {
      left: 50,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#adb5bd',
        },
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: [
      {
        type: 'value',
        alignTicks: true,
        axisLine: {
          show: true,
          symbol: ['none', 'arrow'],
          symbolSize: [7, 15],
          symbolOffset: [0, 12],
        },
      },
      {
        type: 'value',
        alignTicks: true,
      },
    ],
    series: [
      {
        name: '访问差值',
        type: 'line',
        showSymbol: false,
        smooth: true,
        areaStyle: {
          opacity: 0.9,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 102, 255, 0.5)',
            },
            {
              offset: 0.8,
              color: 'rgba(0, 102, 255, 0)',
            },
          ]),
        },
        yAxisIndex: 1,
      },
      {
        name: '本周访问',
        type: 'bar',
        barWidth: '30%',
        barGap: '-100%',
        z: 2,
      },
      {
        name: '上周访问',
        type: 'bar',
        barWidth: '30%',
        barGap: '-100%',
        z: 1,
      },
    ],
  };
};
