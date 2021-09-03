import * as React from 'react';
import { Input, Form, Radio, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { differenceInYears, isFuture } from 'date-fns';
import locale from 'antd/es/date-picker/locale/pt_BR';

import * as S from './styles';

type DriverGeneralDataFormProps = {
  onNextPage: () => void;
};

const requiredRule = { required: true, message: 'Campo obrigatório' };

export function DriverGeneralDataForm({
  onNextPage,
}: DriverGeneralDataFormProps) {
  const [registerCNH, setRegisterCNH] = React.useState(false);

  function handleFormSubmit(values: any) {
    console.log(values);
    onNextPage();
  }

  return (
    <Form layout="vertical" requiredMark onFinish={handleFormSubmit}>
      <S.Space>
        <Form.Item
          name="name"
          label="Nome completo"
          rules={[requiredRule, { min: 3, message: 'Mínimo de 3 caracteres' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="birthDate"
          label="Data de nascimento"
          rules={[
            {
              validator(_, value) {
                const currentValueDate = new Date(value);

                if (isFuture(currentValueDate)) {
                  return Promise.reject(
                    new Error('Não é permitido datas futuras'),
                  );
                }

                const age = differenceInYears(new Date(), currentValueDate);

                if (age < 18) {
                  return Promise.reject(
                    new Error('Não permitido menor de idade'),
                  );
                }

                return Promise.resolve();
              },
            },
            requiredRule,
          ]}
        >
          <S.DatePicker placeholder="" locale={locale} format="DD-MM-YYYY" />
        </Form.Item>
      </S.Space>

      <S.Space>
        <Form.Item
          name="cpf"
          label="CPF"
          rules={[
            requiredRule,
            {
              pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              message: 'CPF inválido',
            },
          ]}
        >
          <Input placeholder="999.999.999-99" maxLength={14} />
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
            <Form.Item
              name="CNHNumber"
              label="Número da CNH"
              rules={[
                requiredRule,
                { min: 11, message: 'Mínimo de 11 dígitos' },
                { max: 15, message: 'Máximo de 15 dígitos' },
                {
                  pattern: /^\d*$/,
                  message: 'Somente números permitidos',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </S.Space>

          <S.HalvedSpace>
            <Form.Item
              name="CNHCategories"
              label="Categoria"
              rules={[requiredRule]}
            >
              <Select mode="multiple" allowClear>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D">D</Select.Option>
                <Select.Option value="E">E</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="CNHExpireDate"
              label="Validade"
              rules={[requiredRule]}
            >
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
