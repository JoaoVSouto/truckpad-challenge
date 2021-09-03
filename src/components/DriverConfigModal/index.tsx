import * as React from 'react';
import { Modal, Steps, Input, Form, Radio, Select, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';

import * as S from './styles';

type DriverConfigModalProps = {
  visible: boolean;
  onRequestClose: () => void;
};

export function DriverConfigModal({
  onRequestClose,
  visible,
}: DriverConfigModalProps) {
  const [registerCNH, setRegisterCNH] = React.useState(false);

  return (
    <Modal visible={visible} onCancel={onRequestClose} footer={null}>
      <S.Container>
        <Steps current={0}>
          <Steps.Step title="Dados gerais" />
          <Steps.Step title="Endereço" />
        </Steps>

        <S.FormContainer>
          <Form layout="vertical" requiredMark>
            <S.Space>
              <Form.Item label="Nome completo" required>
                <Input />
              </Form.Item>
              <Form.Item label="Data de nascimento" required>
                <S.DatePicker
                  placeholder=""
                  locale={locale}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </S.Space>

            <S.Space>
              <Form.Item label="CPF" required>
                <Input />
              </Form.Item>
              <Form.Item name="radio-group" label="Registrar CNH?">
                <div>
                  <Radio
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
                  <Form.Item label="Número da CNH">
                    <Input />
                  </Form.Item>
                </S.Space>

                <S.CategoryValiditySpace>
                  <Form.Item label="Categoria">
                    <Select mode="multiple" allowClear>
                      <Select.Option value="a">A</Select.Option>
                      <Select.Option value="b">B</Select.Option>
                      <Select.Option value="c">C</Select.Option>
                      <Select.Option value="d">D</Select.Option>
                      <Select.Option value="e">E</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Validade">
                    <S.DatePicker
                      placeholder=""
                      locale={locale}
                      format="DD-MM-YYYY"
                    />
                  </Form.Item>
                </S.CategoryValiditySpace>
              </>
            )}
          </Form>

          <S.NextButton type="primary" icon={<RightOutlined />}>
            Próximo
          </S.NextButton>
        </S.FormContainer>
      </S.Container>
    </Modal>
  );
}
