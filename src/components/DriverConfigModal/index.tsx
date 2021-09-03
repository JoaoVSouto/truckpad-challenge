import * as React from 'react';
import { Modal, Steps } from 'antd';

import { GeneralDriverDataForm } from 'components/GeneralDriverDataForm';
import { AddressDriverForm } from 'components/AddressDriverForm';

import * as S from './styles';

type DriverConfigModalProps = {
  visible: boolean;
  onRequestClose: () => void;
};

export function DriverConfigModal({
  onRequestClose,
  visible,
}: DriverConfigModalProps) {
  const [currentStep, setCurrentStep] = React.useState(0);

  function handleNextPage() {
    setCurrentStep(state => state + 1);
  }

  function handlePreviousPage() {
    setCurrentStep(state => state - 1);
  }

  function handleModalClose() {
    setCurrentStep(0);
    onRequestClose();
  }

  return (
    <Modal visible={visible} onCancel={handleModalClose} footer={null}>
      <S.Container>
        <Steps current={currentStep}>
          <Steps.Step title="Dados gerais" />
          <Steps.Step title="Endereço" />
        </Steps>

        <S.FormContainer>
          {currentStep === 0 && (
            <GeneralDriverDataForm onNextPage={handleNextPage} />
          )}
          {currentStep === 1 && (
            <AddressDriverForm onPreviousPage={handlePreviousPage} />
          )}
        </S.FormContainer>
      </S.Container>
    </Modal>
  );
}
