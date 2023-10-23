import { IFormBaseComponentsUnion } from '@fch/fch-web-shop';
import { StateOptions } from '~/utils/constant/common.const';

export class UserManageState {
  open = false;
}

export enum PLATFORM_TYPE {
  /** 平台 */
  Platform = 'platform',
  /** 渠道 */
  Channel = 'channel',
  /** 代理商 */
  Distributor = 'distributor',
}

export const platformTypeOptions = [
  { value: PLATFORM_TYPE.Platform, label: '平台', color: 'red' },
  { value: PLATFORM_TYPE.Channel, label: '渠道', color: 'orange' },
  { value: PLATFORM_TYPE.Distributor, label: '代理商', color: 'blue' },
];

export const schema: IFormBaseComponentsUnion[] = [
  {
    key: 'container',
    type: 'Layout',
    children: [
      {
        key: 'id',
        type: 'SelectUser',
        formItemProps: {
          label: '用户id',
        },
      },
      {
        key: 'time',
        type: 'RangePicker',
        formItemProps: {
          label: '时间',
        },
        props: {
          allowClear: true,
        },
      },
      {
        key: 'name',
        type: 'Input',
        formItemProps: {
          label: '用户昵称',
        },
        props: {
          placeholder: '请输入昵称',
          allowClear: true,
        },
      },
      {
        key: 'mobile',
        type: 'Input',
        formItemProps: {
          label: '手机号',
        },
        props: {
          placeholder: '请输入手机号',
          allowClear: true,
        },
      },
      {
        key: 'state',
        type: 'Select',
        formItemProps: {
          label: '状态',
        },
        props: {
          placeholder: '请选择状态',
          options: StateOptions,
          allowClear: true,
        },
      },
    ],
    props: {
      cols: 3,
    },
  },
];
