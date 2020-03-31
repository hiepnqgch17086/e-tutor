import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from 'reactstrap';
import { defaultOfUser, User } from '../../models-one-entity/Users';
import CustomInput from '../../components-in-managing-resources/CustomInput';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';

const cloneUser = User.create({})

const EditPassword = ({
  className = "",
  user = defaultOfUser,
}) => {

  const [modal, setModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');

  const toggle = () => setModal(!modal);

  const onSubmit = async () => {
    // update in server
    const { errorMessage } = await cloneUser.setDatabaseMyPasswordUpdate(oldPassword)
    if (errorMessage) return

    // update in client
    user.setPassword(cloneUser.password, false)
    toggle()
  }

  useEffect(() => {
    // clone user
    cloneUser.setSnapshotNew(getSnapshot(user))
  }, [user.email])

  // *fix bug
  useEffect(() => {
    if (!modal) {
      // userData.setSnapshotNew({})
      setOldPassword('')
    }
    cloneUser.setPassword('', false)
    cloneUser._setIsPasswordError(null)
    cloneUser.setRepeatPassword('', false)
    cloneUser._setIsRepeatPasswordError(null)
  }, [modal])

  return (
    <div>
      <Button className={className} onClick={toggle}>Change Password</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Change Password</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="old-password">Old Password *</Label>
            <CustomInput
              error={null}
              value={oldPassword}
              onChangeText={setOldPassword}
              placeholder="old password"
              type="password"
              id="old-password"
            />
          </FormGroup>

          <FormGroup>
            <Label for="new-password">New Password *</Label>
            <CustomInput
              error={cloneUser.isPasswordError}
              value={cloneUser.password}
              onChangeText={cloneUser.setPassword}
              placeholder="new password"
              type="password"
              id="new-password"
            />
          </FormGroup>

          <FormGroup>
            <Label for="repeat-password">Repeat Password *</Label>
            <CustomInput
              error={cloneUser.isRepeatPasswordError}
              value={cloneUser.repeatPassword}
              onChangeText={cloneUser.setRepeatPassword}
              placeholder="repeat password"
              type="password"
              id="repeat-password"
            />
          </FormGroup>




        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmit}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default observer(EditPassword);
