import { Modal } from 'antd';

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
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}
