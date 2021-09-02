import { Modal, Steps, Input, Row, Col } from 'antd';
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
          <Input.Group size="large">
            <Row gutter={8}>
              <Col span={12}>
                <S.InputGroup>
                  <label htmlFor="name-input">Nome completo</label>
                  <Input id="name-input" />
                </S.InputGroup>
              </Col>
              <Col span={12}>
                <S.InputGroup>
                  <label htmlFor="name-input">Data de nascimento</label>
                  <S.DatePicker
                    placeholder=""
                    locale={locale}
                    format="DD-MM-YYYY"
                  />
                </S.InputGroup>
              </Col>
            </Row>
          </Input.Group>
        </S.FormContainer>
      </S.Container>
    </Modal>
  );
}
