import React from 'react'
import { observer } from 'mobx-react-lite'
import ProfilePageData from '../ProfilePage/data';
import { IS_STUDENT, IS_TUTOR, IS_ADMIN } from '../../models-one-prop/role';
import ForStudent from './ForStudent';
import ForAdmin from './ForAdmin';
import ForTutor from './ForTutor';

// or DashboardPage
const HomePage = ({ user = {} }: any) => {
  const { currentUser } = ProfilePageData
  const { role: propRole = '' } = user

  let role = propRole || currentUser.role
  const userId = user.id || currentUser.id
  // role = IS_ADMIN

  switch (role) {
    case IS_STUDENT:
      return <ForStudent />;
    case IS_TUTOR:
      return <ForTutor tutorId={userId} />;
    case IS_ADMIN:
      return <ForAdmin />;
    default:
      return <div></div>;
  }
}

export default observer(HomePage)
