import { IFormBaseComponentsUnion } from '@fch/fch-web-shop';
import { RegExpRule } from '~/utils/tools/rule';

export const schema: IFormBaseComponentsUnion[] = [
    {
        key: 'container',
        type: 'Layout',
        children: [
            {
                key: 'account',
                type: 'Input',
                formItemProps: {
                    label: '用户名',
                    required: true,
                },
                props: {
                    allowClear: true,
                    placeholder: '请输入用户名',
                },
            },
            {
                key: 'name',
                type: 'Input',
                formItemProps: {
                    label: '昵称',
                },
                props: {
                    allowClear: true,
                    placeholder: '请输入昵称',
                },
            },
            {
                key: 'telephone',
                type: 'Input',
                formItemProps: {
                    label: '手机号',
                    rules: [RegExpRule.mobile],
                },
                props: {
                    allowClear: true,
                    placeholder: '请输入员工手机号',
                },
            },
            {
                key: 'img',
                type: 'UploadComponent',
                formItemProps: {
                    label: '相册',
                },
                props: {
                    maxCount: 2
                },
            },
        ],
        props: {
            cols: 1,
        },
    },
];
