import * as React from 'react';
import { Input, Form, Radio, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';

import * as S from './styles';

type GeneralDriverDataForm = {
  onNextPage: () => void;
};

export function GeneralDriverDataForm({ onNextPage }: GeneralDriverDataForm) {
  const [registerCNH, setRegisterCNH] = React.useState(false);

  function handleFormSubmit() {
    onNextPage();
  }

  return (
    <Form layout="vertical" requiredMark onFinish={handleFormSubmit}>
      <S.Space>
        <Form.Item label="Nome completo" required>
          <Input />
        </Form.Item>
        <Form.Item label="Data de nascimento" required>
          <S.DatePicker placeholder="" locale={locale} format="DD-MM-YYYY" />
        </Form.Item>
      </S.Space>

      <S.Space>
        <Form.Item label="CPF" required>
          <Input />
        </Form.Item>
        <Form.Item label="Registrar CNH?">
          <div>
            <Radio onChange={() => setRegisterCNH(true)} checked={registerCNH}>
              Sim
            </Radio>
            <Radio
              onChange={() => setRegisterCNH(false)}
              checked={!registerCNH}
            >
              Não
            </Radio>
          </div>
        </Form.Item>
      </S.Space>

      {registerCNH && (
        <>
          <S.Space>
            <Form.Item label="Número da CNH">
              <Input />
            </Form.Item>
          </S.Space>

          <S.HalvedSpace>
            <Form.Item label="Categoria">
              <Select mode="multiple" allowClear>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D">D</Select.Option>
                <Select.Option value="E">E</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Validade">
              <S.DatePicker
                placeholder=""
                locale={locale}
                format="DD-MM-YYYY"
              />
            </Form.Item>
          </S.HalvedSpace>
        </>
      )}

      <S.NextButton htmlType="submit" type="primary" icon={<RightOutlined />}>
        Próximo
      </S.NextButton>
    </Form>
  );
}
