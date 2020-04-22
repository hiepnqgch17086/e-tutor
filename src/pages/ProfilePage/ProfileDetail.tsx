import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser } from '../../models-one-entity/Users'
import { Row, Col } from 'reactstrap'
import AvatarInDefault from '../../images/AvatarInDefault'
import { IS_TUTOR } from '../../models-one-prop/role'

const ProfileDetail = ({
  user = defaultOfUser
}) => {

  useEffect(() => {
    if (user.role === IS_TUTOR) {
      user.getDatabaseNumberOfStudentsOfTutor(user.id)
    }
  }, [user, user.role])

  return (
    <div className="card">
      <div className="card-body">
        <Row>
          <Col md={4} sm={12} className="d-flex flex-column align-items-center">
            <img width="200px" height="200px" src={user.avatar || AvatarInDefault} alt="Card cap" className="rounded-circle" />
          </Col>
          <Col md={8} sm={12}>
            <h1 className="text-dark">Profile</h1>
            <div><i className="fas fa-chevron-right" /> Name: {user.name}</div>
            <div><i className="fas fa-chevron-right" /> Email: {user.email}</div>
            <div><i className="fas fa-chevron-right" /> Role: {user.isTutor && 'Tutor'}{user.isAdmin && 'Admin'}{user.isStudent && 'Student'}</div>
            {
              user.tutorId ? (
                <div><i className="fas fa-chevron-right" /> Tutor: {user.tutorId.email}</div>
              ) : null
            }
            {
              user.role === IS_TUTOR ? (
                <div><i className="fas fa-chevron-right" /> Number of student in supporting: {user.numberOfStudentsOfTutor}</div>
              ) : null
            }

          </Col>
        </Row>
      </div>
    </div>
  )
}

export default observer(ProfileDetail)
