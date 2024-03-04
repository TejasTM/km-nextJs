// components/Modal.js
import React from 'react';
import { Modal, Button } from 'antd';
import { DeleteButton,SecondaryButton, TertiaryButton ,PrimaryButton} from './buttons/Button';
const CustomModal = ({ title, open, onCancel, onOk, okText, cancelText, children }) => {
  return (
    <Modal
      title={title}
      open={open}
      footer={null} // Hide the default footer
      onCancel={onCancel}
    >
      {children}
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <TertiaryButton onClick={onCancel}  label={cancelText}  />
        <SecondaryButton style={{ marginLeft: '8px' }} onClick={onOk} label={okText}/>
      </div>
    </Modal>
  );
};

export default CustomModal;
