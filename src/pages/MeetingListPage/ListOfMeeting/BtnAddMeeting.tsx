/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfilePageData from '../../ProfilePage/data';
import { IS_STUDENT } from '../../../models-one-prop/role';
import { observer } from 'mobx-react-lite';
import SearchBar from '../../../components-in-managing-resources/SearchBar';

const BtnAddMeeting = () => {
  const { currentUser } = ProfilePageData

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  if (currentUser.role === IS_STUDENT) return <div></div>
  return (
    <div>
      <Button color="danger" onClick={toggle}>Add Meeting</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Meeting</ModalHeader>
        <ModalBody>
          <SearchBar
            placeholder="student's email"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(BtnAddMeeting);
