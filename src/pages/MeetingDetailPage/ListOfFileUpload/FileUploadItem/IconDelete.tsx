import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { defaultOfMeetingFileUpload } from '../../../../models-one-entity/MeetingFileUploads';
import { observer } from 'mobx-react-lite';

const IconDelete = ({
  meetingFileUpload = defaultOfMeetingFileUpload,
  setIsCallingApi = (boolean: boolean) => { }
}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const onDelete = async () => {
    toggle()
    setIsCallingApi(true)
    const { errorMessage } = await meetingFileUpload.setDatabaseDelete()
    if (errorMessage) {
      setIsCallingApi(false)
    }
    // Data.meeting.setFileUploadRemove(meetingFileUpload.id)
  }

  return (
    <>
      <i className="icon-trash cursor-pointer ml-1 x-item" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>{meetingFileUpload.name}</ModalHeader>
        <ModalBody>
          Should delete this file?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onDelete}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default observer(IconDelete);
