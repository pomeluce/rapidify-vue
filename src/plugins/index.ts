import { App } from 'vue';
import { setup as axios } from '@/plugins/axios';
import { setup as dayjs } from '@/plugins/dayjs';
import { setup as iconPack } from '@/plugins/iconpack';
import { setup as pinia } from '@/plugins/pinia';
import { setup as router } from '@/plugins/router';
import { setup as tailwindcss } from '@/plugins/tailwindcss';
import { setup as vxeTable } from '@/plugins/vxe-table';

const modules = [axios, dayjs, iconPack, pinia, router, tailwindcss, vxeTable];
export default (app: App) => {
  modules.map(module => module(app));
};
