import { ColumnTools, PrimaryInfo } from '@fch/fch-web-shop';
import { platformTypeOptions } from '../user-manage.interface';

const { renderTag, renderImg } = ColumnTools();
export const ListSchema: PrimaryInfo[] = [
    {
        id: 'avatar',
        name: '头像',
        contentRender: () => renderImg('https://upload.i-cbao.com/files/20230424/09845fe2-9078-4d26-a825-7dbf8fad8fda.jpg')
    },
    {
        id: 'account',
        name: '用户名',
    },
    {
        id: 'name',
        name: '昵称',
    },
    {
        id: 'telephone',
        name: '手机号',
    },
    {
        id: 'rolesCodeList',
        name: '账户类型',
        contentRender: (data: any) => renderTag(platformTypeOptions, data?.rolesCodeList?.[0]?.code?.split('-')[0])
    },
    {
        id: 'createTime',
        name: '创建时间',
    },
]
