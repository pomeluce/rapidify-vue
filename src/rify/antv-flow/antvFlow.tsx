import { Graph } from '@antv/x6';

Graph.registerNode(
  'custom-node-width-port',
  {
    inherit: 'rect',
    width: 100,
    height: 40,
    attrs: {
      body: {
        stroke: '#8f8f8f',
        strokeWidth: 1,
        fill: '#fff',
        rx: 6,
        ry: 6,
      },
    },
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5,
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              magnet: true,
              stroke: '#8f8f8f',
              r: 5,
            },
          },
        },
      },
    },
  },
  true,
);

export default defineComponent({
  name: 'rify-antv-flow',
  setup() {
    onMounted(() => {
      const graph = new Graph({
        container: document.getElementById('container')!,
        height: 600,
        background: {
          color: '#F2F7FA',
        },
        grid: {
          visible: true,
          type: 'doubleMesh',
          args: [
            {
              color: '#eee', // 主网格线颜色
              thickness: 1, // 主网格线宽度
            },
            {
              color: '#ddd', // 次网格线颜色
              thickness: 1, // 次网格线宽度
              factor: 4, // 主次网格线间隔
            },
          ],
        },
        autoResize: true, // 自适应大小
        panning: true, // 是否支持画布平移
        mousewheel: true, // 是否支持鼠标滚轮缩放
      });

      const source = graph.addNode({
        shape: 'custom-node-width-port',
        x: 40,
        y: 40,
        label: 'hello',
        ports: {
          items: [
            {
              id: 'port_1',
              group: 'bottom',
            },
            {
              id: 'port_2',
              group: 'bottom',
            },
          ],
        },
      });

      const target = graph.addNode({
        shape: 'custom-node-width-port',
        x: 160,
        y: 180,
        label: 'world',
        ports: {
          items: [
            {
              id: 'port_3',
              group: 'top',
            },
            {
              id: 'port_4',
              group: 'top',
            },
          ],
        },
      });

      graph.addEdge({
        source: { cell: source, port: 'port_2' },
        target: { cell: target, port: 'port_3' },
        attrs: {
          line: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
          },
        },
      });

      graph.centerContent();
    });

    return () => (
      <main class={'w-full h-full box-border'}>
        <div id="container"></div>
      </main>
    );
  },
});
