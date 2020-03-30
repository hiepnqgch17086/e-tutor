
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import '../index.css'
import TutorList from './TutorList';
import { observer } from 'mobx-react-lite';
import tutorsData from './data';
import SearchBar from '../../../../components-in-managing-resources/SearchBar';
import PaginationBar from '../../../../components-in-managing-resources/PaginationBar';
import SlNumberOfItems from '../../../../components-in-managing-resources/SlNumberOfItems';

const BtnAddStudent = (props: any) => {

  const { limit, setLimit, page, setPage, getDatabaseItemsWhoAreTutors, setSearchByEmail } = tutorsData

  const {
    buttonLabel,
    className
  } = props;

  const [isModalVisible, setIsModalVisibel] = useState(false);

  const toggle = () => setIsModalVisibel(!isModalVisible);

  return (
    <div>
      <Button color="primary" onClick={toggle}>Edit</Button>
      <Modal isOpen={isModalVisible} toggle={toggle} className={className} style={{ maxWidth: '900px' }}>
        <ModalHeader toggle={toggle}>
          <SearchBar
            placeholder={"Enter student's email"}
            getDatabaseItems={getDatabaseItemsWhoAreTutors}
            setGlobalInput={setSearchByEmail}
            setPage={setPage}
            className="mb-0"
          />
        </ModalHeader>
        <ModalBody>
          <SlNumberOfItems
            limit={limit} setLimit={setLimit}
          />
          <TutorList isModalVisible={isModalVisible} />
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
