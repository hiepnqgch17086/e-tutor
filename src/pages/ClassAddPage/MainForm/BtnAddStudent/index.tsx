
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import '../index.css'
import StudentList from './StudentList';
import { observer, Observer } from 'mobx-react-lite';
import studentsData from './data';
import SearchBar from '../../../../components-in-managing-resources/SearchBar';
import PaginationBar from '../../../../components-in-managing-resources/PaginationBar';
import SlNumberOfItems from '../../../../components-in-managing-resources/SlNumberOfItems';

const BtnAddStudent = (props: any) => {

  const { limit, setLimit, page, setPage, getDatabaseItemsWhoAreStudents: getDatabaseItemsWhoAreStudent, setSearchByEmail } = studentsData

  const {
    buttonLabel,
    className
  } = props;

  const [isModalVisible, setIsModalVisibel] = useState(false);

  const toggle = () => setIsModalVisibel(!isModalVisible);

  return (
    <div>
      <Button color="primary" onClick={toggle}>Add</Button>
      <Modal isOpen={isModalVisible} toggle={toggle} className={className} style={{ maxWidth: '900px' }}>
        <ModalHeader toggle={toggle}>
          <SearchBar
            placeholder={"Enter student's email"}
            getDatabaseItems={getDatabaseItemsWhoAreStudent}
            setGlobalInput={setSearchByEmail}
            setPage={setPage}
          />
        </ModalHeader>
        <ModalBody>
          <SlNumberOfItems
            limit={limit} setLimit={setLimit}
          />
          <StudentList isModalVisible={isModalVisible} />
          <PaginationBar
            page={page}
            setPage={setPage}
          />


        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(BtnAddStudent)
