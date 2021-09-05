import * as React from 'react';
import InputMask from 'react-input-mask';
import { Input, Form, Radio, Select, Button, Spin } from 'antd';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';

import { api } from 'services/api';

import { BRAZILIAN_STATES } from 'utils/brazilianStates';

import * as S from './styles';

export type DriverAddressData = {
  postalCode: string;
  name: string;
  state: string;
  city: string;
  streetName: string;
  neighborhood: string;
  streetNumber?: number;
  complement?: string;
};

type DriverAddressFormProps = {
  isLoading: boolean;
  initialValues?: Partial<DriverAddressData>;
  onPreviousPage: () => void;
  onSuccessfulSubmit: (payload: DriverAddressData) => void;
};

type StatesInitials = keyof typeof BRAZILIAN_STATES;

type FormData = {
  postalCode: string;
  state: StatesInitials;
  city: string;
  streetName: string;
  neighborhood: string;
  streetNumber?: string;
  complement?: string;
};

type IBGECityResponse = {
  nome: string;
};

type ViaCepResponse = {
  bairro: string;
  complemento: string;
  localidade: string;
  logradouro: string;
  uf: StatesInitials;
};

type AvailableLocals = 'Casa' | 'Trabalho';

const requiredRule = { required: true, message: 'Campo obrigatório' };

export function DriverAddressForm({
  isLoading,
  initialValues,
  onPreviousPage,
  onSuccessfulSubmit,
}: DriverAddressFormProps) {
  const [form] = Form.useForm();

  const [local, setLocal] = React.useState<AvailableLocals>(
    (initialValues?.name as AvailableLocals) ?? 'Casa',
  );
  const [cities, setCities] = React.useState<string[]>([]);
  const [isFetchingCities, setIsFetchingCities] = React.useState(false);
  const [isFetchingAddress, setIsFetchingAddress] = React.useState(false);

  async function fetchStateCities(stateInitials: string) {
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

  React.useEffect(() => {
    if (initialValues?.state) {
      const stateInitials = Object.entries(BRAZILIAN_STATES).find(
        ([_, name]) => name === initialValues.state,
      )?.[0];

      if (stateInitials) {
        fetchStateCities(stateInitials);
      }
    }
  }, [initialValues?.state]);

  function handleFormSubmit(values: FormData) {
    const payload = {
      postalCode: values.postalCode,
      name: local,
      state: BRAZILIAN_STATES[values.state],
      city: values.city,
      streetName: values.streetName,
      neighborhood: values.neighborhood,
      streetNumber: Number(values.streetNumber) || undefined,
      complement: values.complement || undefined,
    };

    onSuccessfulSubmit(payload);
  }

  function handleSelectStateChange(stateInitials: StatesInitials) {
    form.setFieldsValue({ city: '' });
    fetchStateCities(stateInitials);
  }

  async function fetchAddress(postalCode: string) {
    setIsFetchingAddress(true);

    try {
      const postalCodeResponse = await api.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${postalCode}/json`,
      );

      fetchStateCities(postalCodeResponse.data.uf);

      form.setFieldsValue({
        state: postalCodeResponse.data.uf,
        city: postalCodeResponse.data.localidade,
        streetName: postalCodeResponse.data.logradouro,
        neighborhood: postalCodeResponse.data.bairro,
        ...(postalCodeResponse.data.complemento
          ? { complement: postalCodeResponse.data.complemento }
          : {}),
      });
    } finally {
      setIsFetchingAddress(false);
    }
  }

  async function handlePostalCodeChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const postalCode = e.target.value;

    const isValidPostalCode = /^[0-9]{5}-[0-9]{3}$/.test(postalCode);

    if (!isValidPostalCode) {
      return;
    }

    fetchAddress(postalCode);
  }

  return (
    <Form
      layout="vertical"
      requiredMark
      form={form}
      onFinish={handleFormSubmit}
      initialValues={{
        postalCode: initialValues?.postalCode,
        state: Object.entries(BRAZILIAN_STATES).find(
          ([_, name]) => name === initialValues?.state,
        )?.[0],
        city: initialValues?.city,
        streetName: initialValues?.streetName,
        neighborhood: initialValues?.neighborhood,
        streetNumber: initialValues?.streetNumber,
        complement: initialValues?.complement,
      }}
    >
      <S.Space>
        <Form.Item
          name="postalCode"
          label="CEP"
          rules={[
            requiredRule,
            {
              pattern: /^[0-9]{5}-[0-9]{3}$/,
              message: 'CEP inválido',
              validateTrigger: 'onSubmit',
            },
          ]}
        >
          <InputMask
            mask="99999-999"
            onChange={handlePostalCodeChange}
            disabled={isFetchingAddress}
          >
            <Input
              data-testid="driver-postal-code-input"
              suffix={
                isFetchingAddress && <Spin indicator={<LoadingOutlined />} />
              }
            />
          </InputMask>
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
        <Button
          type="ghost"
          icon={<LeftOutlined />}
          onClick={onPreviousPage}
          disabled={isLoading}
        >
          Anterior
        </Button>
        <Button
          data-testid="save-driver-btn"
          htmlType="submit"
          type="primary"
          loading={isLoading}
        >
          Salvar
        </Button>
      </S.ButtonsContainer>
    </Form>
  );
}
