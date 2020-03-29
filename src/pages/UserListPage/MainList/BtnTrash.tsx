import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser } from '../../../models-one-entity/Users'
import CustomBtnTrash from '../../../components-in-managing-resources/CustomBtnTrash'
import { IS_ADMIN } from '../../../models-one-prop/role'
import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const BtnTrash = ({
  item = defaultOfUser
}) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onDeleteUser = async () => {
    toggle()
    const { isSuccess } = await item.setDatabaseDelete()
    if (isSuccess) item.parentUserList.setItemsToRemove(item.id)
  }

  return (
    <>
      <CustomBtnTrash
        disabled={item.role === IS_ADMIN}
        onClick={toggle}
        className="ml-1"
      />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Notification</ModalHeader>
        <ModalBody>
          Should delete this user?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onDeleteUser}>Ok</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>

  )
}

export default observer(BtnTrash)
