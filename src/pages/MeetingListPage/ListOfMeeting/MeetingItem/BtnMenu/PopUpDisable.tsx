import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { defaultOfMeeting } from '../../../../../models-one-entity/Meetings';
import { observer } from 'mobx-react-lite';

const PopUpDisable = ({
  modal = false,
  toggle = () => { },
  meeting = defaultOfMeeting,
}) => {

  // const [modal, setModal] = useState(false);

  // const toggle = () => setModal(!modal);

  const onDisableMeeting = () => {
    console.log('developing')
    toggle()
  }

  return (
    <div className="d-flex" style={{ width: '100%' }}>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="text-dark">{meeting.title}</ModalHeader>
        <ModalBody>
          Should disable this meeting?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onDisableMeeting}>Diable</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(PopUpDisable);
