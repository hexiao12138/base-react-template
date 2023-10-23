import { ColumnTools, IActionColumnComponent, COMMON_ACTION_TYPE } from '@fch/fch-web-shop';
import { SOLUTION_ACTION_TYPE } from '~/actions/common.action';
import { QueryUserPagedListResType } from '~/modal/demo-modal/demo.interface';
import { platformTypeOptions } from './user-manage.interface';
import { GetColumnsFnType } from '~/utils/type/common.type';

const { render, renderText, renderSwitch, renderTag, renderRemark, renderImg } = ColumnTools({
  errorText: '┑(￣Д ￣)┍',
});

export const getColumns: GetColumnsFnType<QueryUserPagedListResType> = ({ actionFn, isAdmin }) => {
  return [
    {
      title: '用户名',
      dataIndex: 'account',
      render: (val) => renderText(val, 'orange'),
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      render: (_, row) =>
        renderImg(
          row.telephone.includes('18') &&
            'https://upload.i-cbao.com/files/20230424/09845fe2-9078-4d26-a825-7dbf8fad8fda.jpg'
        ),
    },
    {
      title: '昵称',
      dataIndex: 'name',
      render,
    },
    {
      title: '手机号',
      dataIndex: 'telephone',
      render,
    },
    {
      title: '账户类型',
      dataIndex: 'rolesCodeList',
      render: (_, row) => {
        const rolesName = row?.rolesCodeList?.[0]?.code?.split('-')[0];
        return renderTag(platformTypeOptions, rolesName);
      },
    },
    {
      title: '机构信息',
      dataIndex: 'organizationList',
      width: 200,
      render: (_, row) => {
        const { code, id, name } = row?.organizationList[0];
        const info = `机构码：${code} --- id: ${id} --- name: ${name}`;
        return renderRemark(info, 200);
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (val, row) => renderSwitch(val, () => actionFn(COMMON_ACTION_TYPE.STATUS, row)),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 200,
      render,
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_, row) => {
        return (
          <IActionColumnComponent
            actionFn={actionFn}
            actionParam={row}
            actionList={[
              COMMON_ACTION_TYPE.DETAIL,
              COMMON_ACTION_TYPE.EDIT,
              {
                text: SOLUTION_ACTION_TYPE.log,
                show: isAdmin(),
              },
            ]}
          />
        );
      },
    },
  ];
};
