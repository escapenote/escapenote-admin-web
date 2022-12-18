import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Modal, Button, Form, Input, message } from 'antd';

import api from 'api';
import { ICreateGenreBodyProps } from 'api/genre';

interface IProps {
  visible: boolean;
  onCancel: () => void;
  onCallback: () => void;
}
const GenreCreate: React.FC<IProps> = ({ visible, onCancel, onCallback }) => {
  const [id, setId] = useState('');

  useEffect(() => {
    return () => {
      setId('');
    };
  }, [visible]);

  const { mutate, isLoading: isSubmitting } = useMutation(
    (body: ICreateGenreBodyProps) => api.genre.createGenre({ body }),
    {
      onSuccess: () => {
        message.success('성공적으로 저장되었습니다.');
        onCallback();
      },
      onError: () => {
        message.error('에러가 발생했습니다. 관리자에게 문의해주세요.');
      },
    },
  );

  function handleSubmit() {
    const pattern = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    if (pattern.test(id)) {
      message.warning('특수문자는 입력이 불가능합니다.');
      return;
    }

    mutate({ id });
  }

  return (
    <Modal
      title="장르 추가"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      footer={[
        <Button
          key="save"
          type="primary"
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          추가
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="장르" required>
          <Input value={id} onChange={e => setId(e.target.value)} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GenreCreate;
