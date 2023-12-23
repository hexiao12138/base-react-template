import { useForm, COMMON_ACTION_TYPE, FormRenderComponent, IShowMessageComponent } from '@fch/fch-web-shop';
import { Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { QueryUserPagedListResType } from '~/modal/demo-modal/demo.interface';
import { TableRowType, useRowDataStore } from '~/stores/table-row-data';
import { CommonModalProps, ModalStoreProps } from '~/utils/type/common.type';
import { schema } from './add-user.interface';
import UploadComponent from '~/components/base/upload-component/upload-component';

/**
 * 1. 弹窗表单按照此传统写法即可。只需接收open与close事件。需要的外部数据通过 useRowDataStore 获取
 * 2. 所有Modal中的逻辑与操作都统一在 该组件中处理，方便复用与维护。
 * 3. IFormModalComponent 坑暂时较多，不推荐使用
 * */

export const AddUserComponent: React.FC<CommonModalProps> = (props) => {
  const { open, close, submitAfterHander } = props;
  const form = useForm();
  const rowData = useRowDataStore((s) => s.row) as TableRowType<QueryUserPagedListResType>;
  const [spinning, setSpinning] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalStore = getModalStore();

  // 不同状态modal的逻辑处理
  function getModalStore(): ModalStoreProps {
    switch (rowData.ActionType) {
      case COMMON_ACTION_TYPE.ADD:
        return {
          title: '新增用户',
          submit: () => {
            form.validateFields().then((v) => {
              setLoading(true);
              setTimeout(() => {
                IShowMessageComponent.success('新增成功?');
                setLoading(false);
                submitAfterHander?.();
                close();
              }, 1000);
            });
          },
        };
      case COMMON_ACTION_TYPE.EDIT:
        return {
          title: '编辑用户',
          init: () => {
            form.setFieldsValue({
              ...rowData,
              img: [
                'https://upload.i-cbao.com/files/20230424/09845fe2-9078-4d26-a825-7dbf8fad8fda.jpg',
                'https://upload.i-cbao.com/files/20230424/09845fe2-9078-4d26-a825-7dbf8fad8fda.jpg',
              ],
            });
          },
          submit: () => {
            form.validateFields().then((v) => {
              setLoading(true);
              setTimeout(() => {
                IShowMessageComponent.success('编辑成功?');
                setLoading(false);
                submitAfterHander?.();
                close();
              }, 1000);
            });
          },
        };
    }
  }

  useEffect(() => {
    if (open) {
      setLoading(false);
      setSpinning(false);
      form.resetFields();
      modalStore?.init?.();
    }
  }, [open]);

  return (
    <Spin spinning={spinning}>
      <Modal
        destroyOnClose
        width={700}
        title={modalStore?.title}
        open={open}
        onCancel={close}
        onOk={modalStore?.submit}
        confirmLoading={loading}
      >
        <FormRenderComponent
          form={form}
          schema={schema}
          props={{ labelCol: { span: 6 }, wrapperCol: { span: 16 } }}
          widget={{ UploadComponent }}
        />
      </Modal>
    </Spin>
  );
};
