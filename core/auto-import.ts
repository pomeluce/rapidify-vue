import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers';
import { customResolver } from './custom-resolver';

/* 自动导入 */
export default [
  AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    // 自动导入 vue 相关函数
    imports: [
      'vue',
      'vue-router',
      'pinia',
      'vee-validate',
      { 'naive-ui': ['useMessage', 'useDialog', 'useNotification', 'useLoadingBar'] },
    ],
    // 自动导入 NaiveUI api
    resolvers: [NaiveUiResolver()],
    // 自定义函数导入
    dirs: ['src/directives/*.d.ts', 'src/store/**/*', 'src/enum/**/*', 'src/config/**/*', 'src/composable/**/*'],
    // 声明生成的位置
    dts: 'types/rify/auto-imports.d.ts',
    // 使用 vue 模版语法生成代码
    vueTemplate: true,
    // 根据文件名称自动设置默认导出的变量名
    defaultExportByFilename: true,
  }),
  Components({
    resolvers: [
      // 自动导入 naive-ui 组件
      NaiveUiResolver(),
      VueUseComponentsResolver(),
      // 针对 iconPark 图标, 内置 rify 组件按需导入
      customResolver,
    ],
    // 自定义组件自动引入
    dirs: ['src/components'],
    // 指定哪些后缀需要自动导入
    extensions: ['vue', 'tsx', 'md'],
    // 组件名称包含目录, 防止同名组件冲突
    directoryAsNamespace: true,
    // 指定类型声明文件路径
    dts: 'types/rify/components.d.ts',
  }),
];
