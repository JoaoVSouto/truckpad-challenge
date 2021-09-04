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
  isCreating: boolean;
  createDriver: (
    data: DriverGeneralData & { address: DriverAddressData },
  ) => Promise<void>;
  onRequestClose: () => void;
};

type DriverData = {
  address?: DriverAddressData;
} & Partial<DriverGeneralData>;

export function DriverConfigModal({
  createDriver,
  isCreating,
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
    if (isCreating) {
      return;
    }

    setDriverData(null);
    setCurrentStep(0);
    onRequestClose();
  }

  function handleDriverGeneralDataFormSubmit(payload: DriverGeneralData) {
    setDriverData(state => ({ ...state, ...payload }));
  }

  async function handleDriverAddressFormSubmit(payload: DriverAddressData) {
    await createDriver({
      address: payload,
      birthDate: driverData?.birthDate || '',
      cpf: driverData?.cpf || '',
      name: driverData?.name || '',
      cnh: driverData?.cnh,
    });
    handleModalClose();
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
              initialValues={driverData}
              onNextPage={handleNextPage}
              onSuccessfulSubmit={handleDriverGeneralDataFormSubmit}
            />
          )}
          {currentStep === 1 && (
            <DriverAddressForm
              isLoading={isCreating}
              initialValues={driverData?.address}
              onPreviousPage={handlePreviousPage}
              onSuccessfulSubmit={handleDriverAddressFormSubmit}
            />
          )}
        </S.FormContainer>
      </S.Container>
    </Modal>
  );
}
