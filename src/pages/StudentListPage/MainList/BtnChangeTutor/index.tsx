import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AvatarInDefault from '../../../../images/AvatarInDefault';
import BtnSearchTutor from './BtnSearchTutor';
import { defaultOfUser } from '../../../../models-one-entity/Users';
import { newTutor } from './data';
import { Observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import CurrentTutor from './CurrentTutor';
import NewTutor from './NewTutor';

const BtnChangeTutor = ({
  className = '',
  student = defaultOfUser
}) => {
  const currentTutor = student.tutorId || defaultOfUser

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onChangeTutor = () => {
    if (!newTutor.id) {
      toast.error('New tutor is required!')
      return
    }
    student.setTutorNew()
    student.tutorId?.setEmail(newTutor.email)
    student.tutorId?.setId(newTutor.id)
    student.tutorId?.setName(newTutor.name)
    // console.log("newTutor.name", newTutor.name)
    student.setDatabaseChangeTutor()
    toggle()
  }

  return (
    <div>
      <Button color="success" onClick={toggle}
        className={className}
        size="sm"
      >
        <i className="icon-note" />
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          <div>Student</div>
          <a href="#!" className="message-item align-items-center px-3 py-2 d-flex justify-content-start">
            <img src={student.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
            <div className="d-inline-block v-middle pl-2">
              <h6 className="message-title mb-0 mt-1">{student.name}</h6>
              <span className="font-12 text-nowrap d-block text-muted">{student.email}</span>
              <span className="font-12 text-nowrap d-block text-muted"></span>
            </div>
          </a>
          {/* Student: student1@example.com */}
        </ModalHeader>
        <ModalBody>
          <Observer>{() => (
            <>
              <BtnSearchTutor />
              {/* CURRENT TUTOR */}
              {
                currentTutor.id ? (
                  <>
                    <CurrentTutor
                      currentTutor={currentTutor}
                    />
                  </>
                ) : null
              }




              <div className="mt-2">New tutor</div>
              {
                newTutor.id ? (
                  <NewTutor />
                ) : null
              }
            </>
          )}

          </Observer>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onChangeTutor}>Change Tutor</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BtnChangeTutor;
