import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AvatarInDefault from '../../../../images/AvatarInDefault';
import BtnSearchTutor from './BtnSearchTutor';

const BtnChangeTutor = ({
  className = ''
}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="success" onClick={toggle}
        className={className}
      >
        <i className="icon-note" />
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <div>Student</div>
          <a href="#!" className="message-item align-items-center px-3 py-2 d-flex justify-content-start">
            <img src={AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
            <div className="d-inline-block v-middle pl-2">
              <h6 className="message-title mb-0 mt-1">Name of current student</h6>
              <span className="font-12 text-nowrap d-block text-muted">student1@example.com</span>
              <span className="font-12 text-nowrap d-block text-muted"></span>
            </div>
          </a>
          {/* Student: student1@example.com */}
        </ModalHeader>
        <ModalBody>
          <BtnSearchTutor />
          {/* CURRENT TUTOR */}
          <div className="mt-2">Current Tutor</div>
          <a href="#!" className="message-item align-items-center px-3 py-2 d-flex justify-content-start">
            <img src={AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
            <div className="d-inline-block v-middle pl-2">
              <h6 className="message-title mb-0 mt-1">Name of current tutor</h6>
              <span className="font-12 text-nowrap d-block text-muted">tutor1@example.com</span>
              <span className="font-12 text-nowrap d-block text-muted">300 students</span>
            </div>
          </a>



          <div>Change to</div>
          <a href="#!" className="message-item d-flex align-items-center px-3 py-2 justify-content-start">
            <img src={AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
            <div className="d-inline-block v-middle pl-2">
              <h6 className="message-title mb-0 mt-1">Name of next tutor</h6>
              <span className="font-12 text-nowrap d-block text-muted">tutor1@example.com</span>
              <span className="font-12 text-nowrap d-block text-muted">300 students</span>
            </div>
          </a>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Change Tutor</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BtnChangeTutor;
