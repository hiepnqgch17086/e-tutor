import React from 'react'
import { observer } from 'mobx-react-lite'
import ProfilePageData from '../../pages/ProfilePage/data'
import { IS_ADMIN, IS_TUTOR, IS_STUDENT } from '../../models-one-prop/role'
import ForAdmin from './ForAdmin'
import ForTutor from './ForTutor'
import ForStudent from './ForStudent'

const ClassListPage = () => {

  const getPageForRole = () => {
    switch (ProfilePageData.currentUser.role) {
      case IS_ADMIN:
        return <ForAdmin />
      case IS_TUTOR:
        return <ForTutor />
      case IS_STUDENT:
        return <ForStudent />
      default:
        return <div>Role is undefined</div>;
    }
  }

  return (
    <>
      {getPageForRole()}
    </>
  )
}

export default observer(ClassListPage)
