
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';

const ThresholdModal = ({ isOpen, toggle, coin, onConfirm }) => {
  const [threshold, setThreshold] = useState('');

  const handleThresholdChange = (event) => {
    setThreshold(event.target.value);
  };

  const handleConfirm = () => {
    if (coin && threshold) {
      onConfirm(coin, threshold);
      toggle(); // Close the modal
      setThreshold('');
    } else {
      alert('Please enter a valid threshold value');
    }
  };

  const handleCancel = () => {
    toggle();
    setThreshold('')
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Set Alert Threshold</ModalHeader>
      <ModalBody>
        <label>Enter Threshold (BTC) for {coin ? coin.name : ''}:</label>
        <Input
          type="number"
          value={threshold}
          onChange={handleThresholdChange}
          placeholder="Enter threshold value in number"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleCancel}>Cancel</Button>
        <Button color="primary" onClick={handleConfirm}>Confirm</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ThresholdModal;
