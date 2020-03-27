
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import SearchBar from '../../../AllUsersPage/SearchBar';
import SlNumberOfItems from '../../../AllUsersPage/SlNumberOfItems';
import PaginationBar from '../../../AllUsersPage/PaginationBar';
import '../index.css'
import StudentList from './StudentList';

const BtnAddStudent = (props: any) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>Add</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} style={{ maxWidth: '900px' }}>
        <ModalHeader toggle={toggle}>
          <SearchBar
            placeholder={"Enter student's email"}
          />
        </ModalHeader>
        <ModalBody>


          <SlNumberOfItems />
          <StudentList />
          <PaginationBar />
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BtnAddStudent
