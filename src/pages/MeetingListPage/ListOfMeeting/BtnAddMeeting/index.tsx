/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfilePageData from '../../../ProfilePage/data';
import { IS_STUDENT } from '../../../../models-one-prop/role';
import { observer } from 'mobx-react-lite';
import BtnSearchStudent from './BtnSearchStudent';
import CustomInput from '../../../../components-in-managing-resources/CustomInput';
import moment from 'moment';
import AvatarInDefault from '../../../../images/AvatarInDefault';


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
          {/* MEETING WITH THE STUDENT */}
          <div className="mt-2">Meeting with</div>
          <a href="#!" className="message-item d-flex align-items-center px-3 py-2 d-flex justify-content-start">
            <img src={AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
            <div className="d-inline-block v-middle pl-2">
              <h6 className="message-title mb-0 mt-1">Name of tutor's student</h6>
              <span className="font-12 text-nowrap d-block text-muted">student1@example.com</span>
              <span className="font-12 text-nowrap d-block text-muted"></span>
            </div>
          </a>

          {/* TITLE OF MEETING */}
          <div>Title</div>
          <CustomInput
            onChangeText={(text: string) => {
              console.log('developing', text)
            }}
            placeholder="title of meeting"
          />

          <div className="d-flex">
            {/* START TIME */}
            <div className="flex-grow-1">
              <div>Start Time</div>
              <CustomInput
                onChangeText={(text: any) => {
                  console.log('developing', text, moment(
                    moment(dateString).format('YYYY-MM-DD') + ' ' + text
                  ).format())
                }}
                type="time"
              />
            </div>

            {/* END TIME  */}
            <div className="flex-grow-1">
              <div>End Time</div>
              <CustomInput
                onChangeText={(text: any) => {
                  console.log('developing', text, moment(
                    moment(dateString).format('YYYY-MM-DD') + ' ' + text
                  ).format())
                }}
                type="time"
              />
            </div>

          </div>



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
