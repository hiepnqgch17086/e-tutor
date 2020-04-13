import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { defaultOfMeeting, Meeting } from '../../../../../models-one-entity/Meetings';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
//@ts-ignore
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';
import AvatarInDefault from '../../../../../images/AvatarInDefault';
import CustomInput from '../../../../../components-in-managing-resources/CustomInput';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle

const PopUpEdit = ({
  meeting = defaultOfMeeting,
  modal = false,
  setModal = (boo: boolean) => { }
}) => {

  const [cloneMeeting] = useState(Meeting.create(getSnapshot(meeting)))

  const toggle = () => setModal(!modal);
  // console.log(moment(cloneMeeting.startAt).format('LT'))

  const onSubmitEdit = async () => {
    const { errorMessage } = await cloneMeeting.setDatabaseUpdate({
      startAt: cloneMeeting.startAt,
      endAt: cloneMeeting.endAt,
      title: cloneMeeting.title
    })
    if (!errorMessage) {
      toggle()
      toast.success('Updated successfully!')
    }
  }

  useEffect(() => {
    cloneMeeting.setSnapshotNew(Meeting.create(getSnapshot(meeting)))
    // if (!modal) {
    // }
    // eslint-disable-next-line
  }, [modal, meeting])

  return (
    <div className="d-flex" style={{ width: '100%' }}>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-dark">Meeting: {meeting.title}</ModalHeader>
        <ModalBody>
          <div>Meeting title</div>
          <CustomInput
            error={cloneMeeting.isTitleError}
            value={cloneMeeting.title}
            onChangeText={cloneMeeting.setTitle}
            placeholder={"title"}
          />
          <div>Student</div>
          <a href="#!" className="message-item d-flex align-items-center px-3 py-2 d-flex justify-content-start">
            <img src={meeting.studentId.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
            <div className="d-inline-block v-middle pl-2">
              <h6 className="message-title mb-0 mt-1">
                {meeting.studentId.name}
              </h6>
              <span className="font-12 text-nowrap d-block text-muted">
                {meeting.studentId.email}
              </span>
              <span className="font-12 text-nowrap d-block text-muted"></span>
            </div>
          </a>
          <div className="d-flex">
            {/* START TIME */}
            <div className="flex-grow-1">
              <div>Start Time</div>
              <div>
                <DateTimePicker
                  clearIcon={false}
                  onChange={(e: string) => {
                    cloneMeeting.setStartAt(moment(e).format())
                  }}
                  value={new Date(cloneMeeting.startAt)}
                />
              </div>
            </div>

            {/* END TIME  */}
            <div className="flex-grow-1">
              <div>End Time</div>
              <DateTimePicker
                clearIcon={false}
                onChange={(e: string) => {
                  cloneMeeting.setEndAt(moment(e).format())
                }}
                value={new Date(cloneMeeting.endAt)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmitEdit}>Edit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(PopUpEdit);
