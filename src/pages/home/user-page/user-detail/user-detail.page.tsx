import { ColumnTools, Data, IDescriptionListComponent, IPanelComponent } from '@fch/fch-web-shop';
import React, { FC } from 'react';
import { BackNavigate } from '~/components/widget/backN.component';
import { QueryUserPagedListResType } from '~/modal/demo-modal/demo.interface';
import { TableRowType, useRowDataStore } from '~/stores/table-row-data';
import { ListSchema } from './user-detail.interface';
import { Row, Col, Form, Image } from 'antd';
import { platformTypeOptions } from '../user-manage.interface';

const UserDetailPage: FC = () => {
  const rowData = useRowDataStore((s) => s.row) as TableRowType<QueryUserPagedListResType>;
  const { render, renderTag } = ColumnTools();

  return (
    <React.Fragment>
      <IPanelComponent title={<BackNavigate title="用户详情" />} />
      <IPanelComponent title={'IDescriptionListComponent 写法 (暂无法大幅显示某项：如图片)'} className="mt-4">
        <IDescriptionListComponent
          title={null}
          schema={ListSchema}
          data={rowData as unknown as Data}
          cols={3}
          labelCol={3}
          contentCol={6}
        />
      </IPanelComponent>
      <IPanelComponent title={'传统Row_Col搭配Form 写法'} className="mt-4">
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row>
            <Col span={8}>
              <Form.Item label={'ID'}>{render(rowData?.id)}</Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'用户名'}>{render(rowData?.account)}</Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'昵称'}>{render(rowData?.name)}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label={'手机号'}>{render(rowData?.telephone)}</Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'账户类型'}>
                {renderTag(platformTypeOptions, rowData?.rolesCodeList?.[0]?.code?.split('-')[0])}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'创建时间'}>{render(rowData?.createTime)}</Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label={'头像'}>
                <Image
                  width={200}
                  src="https://upload.i-cbao.com/files/20230424/09845fe2-9078-4d26-a825-7dbf8fad8fda.jpg"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </IPanelComponent>
    </React.Fragment>
  );
};

export default UserDetailPage;
