import * as React from 'react';
import { Modal, Steps } from 'antd';

import {
  DriverGeneralDataForm,
  DriverGeneralData,
} from 'components/DriverGeneralDataForm';
import {
  DriverAddressForm,
  DriverAddressData,
} from 'components/DriverAddressForm';

import * as S from './styles';

type DriverConfigModalProps = {
  visible: boolean;
  onRequestClose: () => void;
};

type DriverData = {
  address?: DriverAddressData;
} & Partial<DriverGeneralData>;

export function DriverConfigModal({
  onRequestClose,
  visible,
}: DriverConfigModalProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [driverData, setDriverData] = React.useState<DriverData | null>(null);

  function handleNextPage() {
    setCurrentStep(state => state + 1);
  }

  function handlePreviousPage() {
    setCurrentStep(state => state - 1);
  }

  function handleModalClose() {
    setDriverData(null);
    setCurrentStep(0);
    onRequestClose();
  }

  function handleDriverGeneralDataFormSubmit(payload: DriverGeneralData) {
    setDriverData(state => ({ ...state, ...payload }));
  }

  function handleDriverAddressFormSubmit(payload: DriverAddressData) {
    setDriverData(state => ({ ...state, address: payload }));
  }

  return (
    <Modal
      visible={visible}
      onCancel={handleModalClose}
      footer={null}
      destroyOnClose
    >
      <S.Container>
        <Steps current={currentStep}>
          <Steps.Step title="Dados gerais" />
          <Steps.Step title="Endereço" />
        </Steps>

        <S.FormContainer>
          {currentStep === 0 && (
            <DriverGeneralDataForm
              onNextPage={handleNextPage}
              onSuccessfulSubmit={handleDriverGeneralDataFormSubmit}
            />
          )}
          {currentStep === 1 && (
            <DriverAddressForm
              onPreviousPage={handlePreviousPage}
              onSuccessfulSubmit={handleDriverAddressFormSubmit}
            />
          )}
        </S.FormContainer>
      </S.Container>
    </Modal>
  );
}
