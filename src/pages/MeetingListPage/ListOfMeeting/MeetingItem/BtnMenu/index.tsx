import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';
import PopUpEdit from './PopUpEdit';
import PopUpDisable from './PopUpDisable';
import './btn.css'
import ProfilePageData from '../../../../ProfilePage/data';
import { IS_TUTOR } from '../../../../../models-one-prop/role';
import { observer } from 'mobx-react-lite';
import { defaultOfMeeting } from '../../../../../models-one-entity/Meetings';

const BtnMenu = ({
  meeting = defaultOfMeeting
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false)
  const [modalDisable, setModalDisable] = useState(false)

  const toggle = () => setDropdownOpen(prevState => !prevState);
  const toggleEdit = () => setModalEdit(prevState => !prevState);
  const toggleDisable = () => setModalDisable(prevState => !prevState);
  // console.log(ProfilePageData.currentUser.role)

  if (ProfilePageData.currentUser.role !== IS_TUTOR) return <></>

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="mt-2">
        <DropdownToggle caret color="link" size="sm">
          <i className="icon-options-vertical" />
        </DropdownToggle>
        <DropdownMenu className="p-0">
          <Button onClick={() => {
            toggleEdit()
            toggle()
          }} color="link" className="d-flex btn-custom-2" style={{ width: '100%' }}>Edit</Button>
          {/* <Button onClick={() => {
            toggle()
            toggleDisable()
          }} color="link" className="d-flex btn-custom-2" style={{ width: '100%' }}>Disable</Button> */}
        </DropdownMenu>
      </Dropdown>
      <PopUpDisable
        modal={modalDisable} toggle={toggleDisable}
        meeting={meeting}
      />
      <PopUpEdit modal={modalEdit} setModal={setModalEdit} meeting={meeting} />
    </div>
  );
}

export default observer(BtnMenu);
