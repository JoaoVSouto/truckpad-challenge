import { Modal, Steps, Input, Form } from 'antd';
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
  return (
    <Modal visible={visible} onCancel={onRequestClose} footer={null}>
      <S.Container>
        <Steps current={0}>
          <Steps.Step title="Dados gerais" />
          <Steps.Step title="Endereço" />
        </Steps>

        <S.FormContainer>
          <Form layout="vertical" requiredMark>
            <S.NameBirthdaySpace>
              <Form.Item label="Nome completo" required>
                <Input />
              </Form.Item>
              <Form.Item label="Data de nascimento" required>
                <S.DatePicker
                  id="birthday-input"
                  placeholder=""
                  locale={locale}
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </S.NameBirthdaySpace>
          </Form>
        </S.FormContainer>
      </S.Container>
    </Modal>
  );
}
