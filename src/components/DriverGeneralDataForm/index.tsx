import * as React from 'react';
import InputMask from 'react-input-mask';
import { Input, Form, Radio, Select } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { differenceInYears, isFuture } from 'date-fns';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment, { Moment } from 'moment';

import * as S from './styles';

export type DriverGeneralData = {
  name: string;
  birthDate: string;
  cpf: string;
  cnh?: {
    number: string;
    category: string;
    expiresAt: string;
  };
};

type DriverGeneralDataFormProps = {
  initialValues: Partial<DriverGeneralData> | null;
  onNextPage: () => void;
  onSuccessfulSubmit: (payload: DriverGeneralData) => void;
};

type FormData = {
  name: string;
  cpf: string;
  birthDate: Moment;
  CNHNumber: string;
  CNHExpirationDate: Moment;
  CNHCategories: string[];
};

const requiredRule = { required: true, message: 'Campo obrigatório' };

export function DriverGeneralDataForm({
  initialValues,
  onNextPage,
  onSuccessfulSubmit,
}: DriverGeneralDataFormProps) {
  const [registerCNH, setRegisterCNH] = React.useState(
    Boolean(initialValues?.cnh),
  );

  function handleFormSubmit(values: FormData) {
    const payload = {
      name: values.name,
      birthDate: values.birthDate.startOf('day').toISOString(),
      cpf: values.cpf.replace(/\D/g, ''),
      cnh: registerCNH
        ? {
            number: values.CNHNumber,
            category: [...values.CNHCategories].sort().join(''),
            expiresAt: values.CNHExpirationDate.startOf('day').toISOString(),
          }
        : undefined,
    };

    onSuccessfulSubmit(payload);
    onNextPage();
  }

  return (
    <Form
      layout="vertical"
      requiredMark
      onFinish={handleFormSubmit}
      initialValues={{
        name: initialValues?.name,
        birthDate: initialValues ? moment(initialValues?.birthDate) : '',
        cpf: initialValues?.cpf,
        CNHNumber: initialValues?.cnh?.number,
        CNHCategories: initialValues?.cnh?.category.split(''),
        CNHExpirationDate: initialValues?.cnh
          ? moment(initialValues?.cnh.expiresAt)
          : '',
      }}
    >
      <S.Space>
        <Form.Item
          name="name"
          label="Nome completo"
          rules={[requiredRule, { min: 3, message: 'Mínimo de 3 caracteres' }]}
        >
          <Input data-testid="driver-name-input" />
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
          <S.DatePicker
            placeholder=""
            format="DD/MM/YYYY"
            data-testid="driver-birth-date-input"
          />
        </Form.Item>
      </S.Space>

      <S.Space>
        <Form.Item
          name="cpf"
          label="CPF"
          rules={[
            requiredRule,
            {
              validator(_, value: string) {
                const cpfNumber = value.replace(/\D/g, '');

                if (cpfNumber.length < 11) {
                  return Promise.reject(new Error('CPF inválido'));
                }

                return Promise.resolve();
              },
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <InputMask mask="999.999.999-99">
            <Input data-testid="driver-cpf-input" />
          </InputMask>
        </Form.Item>
        <Form.Item label="Registrar CNH?">
          <div>
            <Radio
              data-testid="check-register-cnh-radio"
              onChange={() => setRegisterCNH(true)}
              checked={registerCNH}
            >
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
                { min: 9, message: 'Mínimo de 9 dígitos' },
                {
                  pattern: /^\d*$/,
                  message: 'Somente números permitidos',
                },
              ]}
            >
              <Input data-testid="driver-cnh-number-input" maxLength={15} />
            </Form.Item>
          </S.Space>

          <S.HalvedSpace>
            <Form.Item
              name="CNHCategories"
              label="Categoria"
              rules={[requiredRule]}
            >
              <Select
                mode="multiple"
                allowClear
                data-testid="driver-cnh-category-input"
              >
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D">D</Select.Option>
                <Select.Option value="E">E</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="CNHExpirationDate"
              label="Validade"
              rules={[requiredRule]}
            >
              <S.DatePicker
                placeholder=""
                format="DD/MM/YYYY"
                data-testid="driver-cnh-expiration-date-input"
              />
            </Form.Item>
          </S.HalvedSpace>
        </>
      )}

      <S.NextButton
        data-testid="submit-driver-general-data-form-btn"
        htmlType="submit"
        type="primary"
        icon={<RightOutlined />}
      >
        Próximo
      </S.NextButton>
    </Form>
  );
}
