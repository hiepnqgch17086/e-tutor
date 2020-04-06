import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CustomInput from '../../../../../components-in-managing-resources/CustomInput';
import { defaultOfMeeting, Meeting } from '../../../../../models-one-entity/Meetings';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';

const PopUpEdit = ({
  meeting = defaultOfMeeting,
  modal = false,
  setModal = (boo: boolean) => { }
}) => {

  const [cloneMeeting, setCloneMeeting] = useState(Meeting.create(getSnapshot(meeting)))

  const toggle = () => setModal(!modal);
  // console.log(moment(cloneMeeting.startAt).format('LT'))

  useEffect(() => {
    if (!modal) {
      cloneMeeting.setSnapshotNew(Meeting.create(getSnapshot(meeting)))
    }
  }, [modal])

  return (
    <div className="d-flex" style={{ width: '100%' }}>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column">
            {/* START TIME */}
            <div>
              <div>Start Time:</div>
              <CustomInput
                value={moment(cloneMeeting.startAt).format('YYYY-MM-DDThh:mm')}
                onChangeText={(text: any) => {
                  cloneMeeting.setStartAt(moment(text).format())
                }}
                type="datetime-local"
              />
            </div>

            {/* END TIME  */}
            <div>
              <div>End Time</div>
              <CustomInput
                value={moment(cloneMeeting.endAt).format('YYYY-MM-DDThh:mm')}
                onChangeText={(text: any) => {
                  cloneMeeting.setEndAt(moment(text).format())
                }}
                type="datetime-local"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Edit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(PopUpEdit);
