<script setup lang="ts">
import { IVisualColumnProp, IVisualTableProp } from '@/components/rify/visualTable';
import dayjs from 'dayjs';

// column 配置
const column: Array<IVisualColumnProp> = [
  { type: 'checkbox', width: '40' },
  { type: 'seq', title: '序号' },
  {
    title: '工号',
    field: 'id',
    sortable: true,
    editRender: {},
    slot: [{ name: 'edit', type: 'number' }],
  },
  {
    title: '姓名',
    field: 'name',
    editRender: {},
    slot: [{ name: 'edit', type: 'input' }],
  },
  {
    title: '年龄',
    field: 'gender',
    filters: [
      { label: '男', value: 1 },
      { label: '女', value: 0 },
    ],
    filterMultiple: false,
    editRender: {},
    slot: [
      { name: 'default', dealWith: (row: UserModel) => (row.gender ? '男' : '女') },
      {
        name: 'edit',
        type: 'select',
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 0 },
        ],
      },
    ],
  },
  {
    title: '技能',
    field: 'technique',
    filters: [
      { label: 'Java', value: 'java' },
      { label: 'Python', value: 'python' },
      { label: 'Vue', value: 'vue' },
    ],
    filterMethod: ({ value, row }) => row.technique.includes(value),
    editRender: {},
    slot: [
      {
        name: 'edit',
        type: 'select',
        multiple: true,
        options: [
          { label: 'Java', value: 'java' },
          { label: 'Python', value: 'python' },
          { label: 'Vue', value: 'vue' },
        ],
      },
    ],
  },
  {
    title: '邮箱',
    field: 'email',
    editRender: {},
    slot: [{ name: 'edit', type: 'input' }],
  },
  {
    title: '创建时间',
    field: 'createTime',
    editRender: {},
    slot: [
      { name: 'default', dealWith: (row: UserModel) => dayjs(new Date(row.createTime)).format('YYYY-MM-DD HH:mm:ss') },
      { name: 'edit', type: 'datetime' },
    ],
  },
  {
    title: '更新时间',
    field: 'updateTime',
    editRender: {},
    slot: [
      { name: 'default', dealWith: (row: UserModel) => dayjs(new Date(row.updateTime)).format('YYYY-MM-DD') },
      { name: 'edit', type: 'date' },
    ],
  },
] as IVisualColumnProp[];

// table 配置
const label: IVisualTableProp = {
  border: true,
  columnConfig: {
    resizable: true,
  },
  showOverflow: true,
  editConfig: {
    trigger: 'click',
    mode: 'cell',
    icon: 'fa fa-edit',
  },
};

// 表单数据
const tableData = ref<UserModel[]>([
  {
    id: 10001,
    name: '张三',
    gender: 1,
    email: 'zhangsan@gmail.com',
    technique: ['java', 'vue'],
    createTime: 1604940444444,
    updateTime: 1704940444444,
  },
  {
    id: 10002,
    name: '李四',
    gender: 0,
    email: 'lisi@gmail.com',
    technique: ['java', 'python'],
    createTime: 1604940444444,
    updateTime: 1704940444444,
  },
] as UserModel[]);
</script>

<template>
  <main>
    <rify-card>
      <template #title> Excel 表格 </template>
      <rify-visual-table :label="label" :column="column" :data="tableData" />
    </rify-card>
  </main>
</template>

<style scoped lang="scss"></style>
