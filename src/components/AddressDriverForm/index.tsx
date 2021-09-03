import { Input, Form, Radio, Select, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import * as S from './styles';

type AddressDriverForm = {
  onPreviousPage: () => void;
};

export function AddressDriverForm({ onPreviousPage }: AddressDriverForm) {
  return (
    <Form layout="vertical" requiredMark>
      <S.Space>
        <Form.Item label="CEP" required>
          <Input />
        </Form.Item>
        <Form.Item label="Local">
          <div>
            <Radio>Casa</Radio>
            <Radio>Trabalho</Radio>
          </div>
        </Form.Item>
      </S.Space>

      <S.HalvedSpace>
        <Form.Item label="Estado" required>
          <Select showSearch notFoundContent="Nenhum estado encontrado">
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Município" required>
          <Select showSearch notFoundContent="Nenhum município encontrado">
            <Select.Option value="jack">Jack</Select.Option>
            <Select.Option value="lucy">Lucy</Select.Option>
          </Select>
        </Form.Item>
      </S.HalvedSpace>

      <S.Space>
        <Form.Item label="Rua ou avenida" required>
          <Input />
        </Form.Item>
      </S.Space>

      <S.ThirdSpace>
        <Form.Item label="Bairro" required>
          <Input />
        </Form.Item>
        <Form.Item label="Número">
          <Input />
        </Form.Item>
        <Form.Item label="Complemento">
          <Input />
        </Form.Item>
      </S.ThirdSpace>

      <S.ButtonsContainer>
        <Button type="ghost" icon={<LeftOutlined />} onClick={onPreviousPage}>
          Anterior
        </Button>
        <Button htmlType="submit" type="primary">
          Salvar
        </Button>
      </S.ButtonsContainer>
    </Form>
  );
}
