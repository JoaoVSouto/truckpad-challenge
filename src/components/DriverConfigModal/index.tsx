import { Modal, Steps } from 'antd';

import { GeneralDriverDataForm } from 'components/GeneralDriverDataForm';

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
          <GeneralDriverDataForm />
        </S.FormContainer>
      </S.Container>
    </Modal>
  );
}
