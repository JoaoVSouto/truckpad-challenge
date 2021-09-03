import * as React from 'react';
import { Input, Form, Radio, Select, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

import { api } from 'services/api';

import { BRAZILIAN_STATES } from 'utils/brazilianStates';

import * as S from './styles';

type DriverAddressFormProps = {
  onPreviousPage: () => void;
};

type FormData = {
  postalCode: string;
  state: string;
  city: string;
  streetName: string;
  neighborhood: string;
  streetNumber?: string;
  complement?: string;
};

type IBGECityResponse = {
  nome: string;
};

type AvailableLocals = 'Casa' | 'Trabalho';

const requiredRule = { required: true, message: 'Campo obrigatório' };

export function DriverAddressForm({ onPreviousPage }: DriverAddressFormProps) {
  const [local, setLocal] = React.useState<AvailableLocals>('Casa');
  const [cities, setCities] = React.useState<string[]>([]);
  const [isFetchingCities, setIsFetchingCities] = React.useState(false);

  function handleFormSubmit(values: FormData) {
    console.log(values);
  }

  async function handleSelectStateChange(
    stateInitials: keyof typeof BRAZILIAN_STATES,
  ) {
    setIsFetchingCities(true);

    try {
      const citiesResponse = await api.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateInitials}/municipios`,
      );
      const parsedCities = citiesResponse.data.map(city => city.nome);
      setCities(parsedCities);
    } finally {
      setIsFetchingCities(false);
    }
  }

  return (
    <Form layout="vertical" requiredMark onFinish={handleFormSubmit}>
      <S.Space>
        <Form.Item
          name="postalCode"
          label="CEP"
          rules={[
            requiredRule,
            {
              pattern: /^[0-9]{5}-[0-9]{3}$/,
              message: 'CEP inválido',
            },
          ]}
        >
          <Input placeholder="99999-999" />
        </Form.Item>
        <Form.Item label="Local">
          <div>
            <Radio checked={local === 'Casa'} onChange={() => setLocal('Casa')}>
              Casa
            </Radio>
            <Radio
              checked={local === 'Trabalho'}
              onChange={() => setLocal('Trabalho')}
            >
              Trabalho
            </Radio>
          </div>
        </Form.Item>
      </S.Space>

      <S.HalvedSpace>
        <Form.Item name="state" label="Estado" rules={[requiredRule]}>
          <Select
            showSearch
            notFoundContent="Nenhum estado encontrado"
            filterOption={(input, option) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={handleSelectStateChange}
            disabled={isFetchingCities}
          >
            {Object.entries(BRAZILIAN_STATES).map(([initials, name]) => (
              <Select.Option key={initials} value={initials}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="city" label="Município" rules={[requiredRule]}>
          <Select
            showSearch
            notFoundContent="Nenhum município encontrado"
            loading={isFetchingCities}
          >
            {cities.map(city => (
              <Select.Option key={city} value={city}>
                {city}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </S.HalvedSpace>

      <S.Space>
        <Form.Item
          name="streetName"
          label="Rua ou avenida"
          rules={[requiredRule]}
        >
          <Input />
        </Form.Item>
      </S.Space>

      <S.ThirdSpace>
        <Form.Item name="neighborhood" label="Bairro" rules={[requiredRule]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="streetNumber"
          label="Número"
          rules={[
            {
              validator(_, value: string) {
                if (!value) {
                  return Promise.resolve();
                }

                const numberValue = Number(value);

                if (numberValue < 1) {
                  return Promise.reject(new Error('Número inválido'));
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="complement" label="Complemento">
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
