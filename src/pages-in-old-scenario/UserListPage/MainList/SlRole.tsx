import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { observer } from 'mobx-react-lite';
import { defaultOfUser } from '../../../models-one-entity/Users';
import { IS_ADMIN, IS_TUTOR, IS_STUDENT } from '../../../models-one-prop/role';

const SlRole = ({
  item = defaultOfUser
}) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onChangeRoleValidate = (e: any) => {
    const role = parseInt(e.target.value)
    if (role === IS_ADMIN) {
      toggle()
      return
    }
    onChangeRoleMainly(role)
  }

  const onChangeRoleMainly = (role: number) => {
    item.setRole(role)
    // console.log(e.target.value)
    item.setDatabaseUpdateRole()
  }

  const onAcceptToChangeIntoAdminRole = () => {
    onChangeRoleMainly(IS_ADMIN)
    toggle()
  }

  return (
    <div>
      <select className="form-control" id="exampleFormControlSelect1"
        value={item.role}
        onChange={onChangeRoleValidate}
        style={{ minWidth: '120px' }}
        disabled={item.role === IS_ADMIN}
      >
        <option value={IS_ADMIN}>Admin</option>
        <option value={IS_TUTOR}>Tutor</option>
        <option value={IS_STUDENT}>Student</option>
      </select>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Notification</ModalHeader>
        <ModalBody>
          Should assign this user as an ADMIN ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAcceptToChangeIntoAdminRole}>OK</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(SlRole);
