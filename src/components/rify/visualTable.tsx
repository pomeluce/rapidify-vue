import { VxeColumn, VxeColumnProps, VxeTable, VxeTableProps, interceptor } from 'vxe-table';
import { PropType } from 'vue';
import { NInput, NDatePicker, NInputNumber, NSelect, SelectOption, SelectGroupOption } from 'naive-ui';
import { LeftOne, RightOne } from '@icon-park/vue-next';

/**
 * 添加事件监听, 保证使用第三方组件是, 被激活单元格不会自动关闭
 * eg: 比如点击了某个组件的弹出层面板之后, 此时被激活单元格不应该被自动关闭, 通过返回 false 可以阻止默认的行为
 */
interceptor.add('event.clearActived', params => {
  return params.$event.target.className.indexOf('overflow-auto') > -1;
});

export type IVisualRowData = Record<string, any>;
export type IVisualColumnSlotType =
  | 'default'
  | 'header'
  | 'footer'
  | 'title'
  | 'checkbox'
  | 'radio'
  | 'content'
  | 'edit'
  | 'filter';
export type IVisualColumnSlotEditType = 'input' | 'select' | 'date' | 'datetime' | 'number';
export type IVisualColumnSlot = {
  name: IVisualColumnSlotType;
  type: IVisualColumnSlotEditType;
  dealWith: (row: IVisualRowData) => any;
  options: SelectOption[] | SelectGroupOption[];
  multiple: boolean;
  attribute: any;
};
export interface IVisualTableProp extends VxeTableProps {}
export interface IVisualColumnProp extends VxeColumnProps {
  slot?: IVisualColumnSlot[];
}

const editSlotAction = {
  input: (row: IVisualRowData, field: string) => <NInput v-model:value={row[field]} />,
  select: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) =>
    slot.multiple ? (
      <NSelect v-model:value={row[field]} multiple options={slot.options} maxTagCount={'responsive'} />
    ) : (
      <NSelect v-model:value={row[field]} options={slot.options} />
    ),
  date: (row: IVisualRowData, field: string) => <NDatePicker v-model:value={row[field]} type={'date'} clearable />,
  datetime: (row: IVisualRowData, field: string) => (
    <NDatePicker v-model:value={row[field]} type={'datetime'} clearable />
  ),
  number: (row: IVisualRowData, field: string) => (
    <NInputNumber
      v-model:value={row[field]}
      v-slots={{
        'minus-icon': () => <LeftOne theme={'filled'} size={22} fill={'#606060'} />,
        'add-icon': () => <RightOne theme={'filled'} size={22} fill={'#606060'} />,
      }}
    />
  ),
};

const slotAction = {
  default: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => (
    <span>{slot.dealWith ? slot.dealWith(row) : row[field]}</span>
  ),
  header: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => (
    <span>{slot.dealWith ? slot.dealWith(row) : row[field]}</span>
  ),
  footer: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => (
    <span>{slot.dealWith ? slot.dealWith(row) : row[field]}</span>
  ),
  title: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => (
    <span>{slot.dealWith ? slot.dealWith(row) : row[field]}</span>
  ),
  checkbox: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => (
    <span>{slot.dealWith ? slot.dealWith(row) : row[field]}</span>
  ),
  radio: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => (
    <span>{slot.dealWith ? slot.dealWith(row) : row[field]}</span>
  ),
  content: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => (
    <span>{slot.dealWith ? slot.dealWith(row) : row[field]}</span>
  ),
  edit: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => editSlotAction[slot.type](row, field, slot),
  filter: (row: IVisualRowData, field: string, slot: IVisualColumnSlot) => (
    <span>{slot.dealWith ? slot.dealWith(row) : row[field]}</span>
  ),
};

const slotMount = ({ slot: slots, field }: IVisualColumnProp) => {
  const slot: Record<string, any> = {};
  field &&
    slots?.map(item => {
      slot[item.name] = ({ row }: { row: IVisualRowData }) => slotAction[item.name](row, field, item);
    });
  return slot;
};

export default defineComponent({
  name: 'rify-visual-table',
  props: {
    data: Array as PropType<IVisualRowData[]>,
    column: {
      type: Array<IVisualColumnProp>,
      default: [],
    },
    label: Object as PropType<IVisualTableProp>,
  },
  setup({ data, column, label }) {
    return () => (
      <main>
        <VxeTable {...label} data={data}>
          <>
            {column.map((item: IVisualColumnProp, index: number) => (
              <VxeColumn {...item} key={index} v-slots={item.slot ? slotMount(item) : null}></VxeColumn>
            ))}
          </>
        </VxeTable>
      </main>
    );
  },
});