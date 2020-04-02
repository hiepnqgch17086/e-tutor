/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfilePageData from '../../ProfilePage/data';
import { IS_STUDENT } from '../../../models-one-prop/role';
import { observer } from 'mobx-react-lite';
import BtnSearchStudent from './BtnAddMeeting/BtnSearchStudent';
import CustomInput from '../../../components-in-managing-resources/CustomInput';
import moment from 'moment';


const BtnAddMeeting = ({
  dateString = ''
}) => {
  const { currentUser } = ProfilePageData

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  if (currentUser.role === IS_STUDENT) return <div></div>
  return (
    <div>
      <Button color="danger" onClick={toggle}>Add Meeting</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{moment(dateString).format('dddd DD-MM-YYYY')}</ModalHeader>
        <ModalBody>
          <BtnSearchStudent />
          <div>Start Time</div>
          <CustomInput
            onChangeText={(text: any) => {
              console.log('developing', text, moment(
                moment(dateString).format('YYYY-MM-DD') + ' ' + text
              ).format())
            }}
            type="time"
          />
          <div>End Time</div>
          <CustomInput
            onChangeText={(text: any) => {
              console.log('developing', text, moment(
                moment(dateString).format('YYYY-MM-DD') + ' ' + text
              ).format())
            }}
            type="time"
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Add meeting</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(BtnAddMeeting);
