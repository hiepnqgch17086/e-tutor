/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfilePageData from '../../../ProfilePage/data';
import { IS_TUTOR } from '../../../../models-one-prop/role';
import { observer } from 'mobx-react-lite';
import BtnSearchStudent from './BtnSearchStudent';
import CustomInput from '../../../../components-in-managing-resources/CustomInput';
import moment from 'moment';
import AvatarInDefault from '../../../../images/AvatarInDefault';
import Data from '../../data'
import { defaultOfUser } from '../../../../models-one-entity/Users';
import { getSnapshot } from 'mobx-state-tree';

const BtnAddMeeting = ({
  dateString = ''
}) => {
  const { currentUser } = ProfilePageData
  const { newMeeting } = Data

  const [modal, setModal] = useState(false);
  const [startAt, setStartAt] = useState('')
  const [endAt, setEndAt] = useState('')

  const toggle = () => setModal(!modal);

  const onSubmit = () => {
    Data.onCreateMeeting(toggle)
  }

  useEffect(() => {
    if (!modal) {
      newMeeting.setSnapshotNew({})
      setStartAt('')
      setEndAt('')
    }
    // eslint-disable-next-line
  }, [modal])

  if (currentUser.role !== IS_TUTOR) return <div></div>
  return (
    <div>
      <Button color="danger" onClick={toggle}>Add Meeting</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-dark">{moment(dateString).format('dddd DD-MM-YYYY')}</ModalHeader>
        <ModalBody>
          <BtnSearchStudent
            onSetStudentInMeeting={(student: typeof defaultOfUser) => {
              newMeeting.setSnapshotNew(getSnapshot(student), newMeeting.studentId)
              // console.log(student)
            }}
          />
          {/* MEETING WITH THE STUDENT */}
          <div className="mt-2">Meeting with</div>
          {
            newMeeting.studentId.id ? (
              <a href="#!" className="message-item d-flex align-items-center px-3 py-2 d-flex justify-content-start">
                <img src={newMeeting.studentId.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
                <div className="d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">
                    {newMeeting.studentId.name}
                  </h6>
                  <span className="font-12 text-nowrap d-block text-muted">
                    {newMeeting.studentId.email}
                  </span>
                  <span className="font-12 text-nowrap d-block text-muted"></span>
                </div>
              </a>
            ) : null
          }


          {/* TITLE OF MEETING */}
          <div>Title</div>
          <CustomInput
            value={newMeeting.title}
            onChangeText={(text: string) => {
              // console.log('developing', text)
              newMeeting.setTitle(text)
            }}
            placeholder="title of meeting"
          />

          <div className="d-flex">
            {/* START TIME */}
            <div className="flex-grow-1">
              <div>Start Time</div>
              <CustomInput
                value={startAt}
                onChangeText={(text: any) => {
                  setStartAt(text)
                  newMeeting.setStartAt(moment(
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
                value={endAt}
                onChangeText={(text: any) => {
                  setEndAt(text)
                  newMeeting.setEndAt(moment(
                    moment(dateString).format('YYYY-MM-DD') + ' ' + text
                  ).format())
                }}
                type="time"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>Add meeting</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(BtnAddMeeting);
