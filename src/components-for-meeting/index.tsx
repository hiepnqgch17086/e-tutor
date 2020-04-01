import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TitleAndBody from './TitleAndBody';
import IpComment from './IpComment';

const ModalExample = ({ item = '' }) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <div className="calendar-events mb-3" data-class="bg-success"
        style={{ cursor: 'pointer' }}
        onClick={toggle}
      >
        {item}
      </div>
      <Modal isOpen={modal} toggle={toggle} >
        <TitleAndBody
          toggle={toggle}
        />
        <ModalFooter>
          <IpComment />
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;
