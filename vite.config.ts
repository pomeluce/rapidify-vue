import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import autoImport from './vite/auto-import';
import { parseEnv } from './vite/utils';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 获取当前环境模式
  const isBuild = command === 'build';
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = parseEnv(loadEnv(mode, process.cwd()));
  return {
    // 加载插件
    plugins: [
      ...autoImport,
      vue(),
      vueJsx(),
      viteMockServe({ mockPath: 'mock', enable: !isBuild && !env.VITE_API_URL }),
    ],
    // 配置路径别名
    resolve: {
      // 导入组件忽略文件后缀
      extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx'],
      // 配置路径别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'types'),
      },
    },
    // 开启 css 模块化
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
    base: isBuild ? '/' : '/',
    // 本地开发服务器配置
    server: {
      // 监听本地所有 ip
      host: true,
      // 代理
      proxy: {},
    },
    build: {
      // 编译是清空输出目录
      emptyOutDir: true,
      // 代码拆包
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.split('/node_modules/').pop()?.split('/')[0];
            }
          },
        },
      },
    },
  };
});