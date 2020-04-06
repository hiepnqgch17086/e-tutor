import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { defaultOfMeeting, Meeting } from '../../../../../models-one-entity/Meetings';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
//@ts-ignore
import DateTimePicker from 'react-datetime-picker';
import { toast } from 'react-toastify';
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle

const PopUpEdit = ({
  meeting = defaultOfMeeting,
  modal = false,
  setModal = (boo: boolean) => { }
}) => {

  // eslint-disable-next-line
  const [cloneMeeting, setCloneMeeting] = useState(Meeting.create(getSnapshot(meeting)))

  const toggle = () => setModal(!modal);
  // console.log(moment(cloneMeeting.startAt).format('LT'))

  const onSubmitEdit = async () => {
    const { errorMessage } = await cloneMeeting.setDatabaseUpdate({
      startAt: cloneMeeting.startAt,
      endAt: cloneMeeting.endAt
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
        <ModalHeader toggle={toggle} className="text-dark">{meeting.title}</ModalHeader>
        <ModalBody>
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
