import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser } from '../../models-one-entity/Users'
import { Row, Col } from 'reactstrap'
import AvatarInDefault from '../../images/AvatarInDefault'

const ProfileDetail = ({
  user = defaultOfUser
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <Row>
          <Col md={4} sm={12} className="d-flex flex-column align-items-center">
            <img width="200px" height="200px" src={user.avatar || AvatarInDefault} alt="Card cap" />
          </Col>
          <Col md={8} sm={12}>
            <div><i className="fas fa-chevron-right" /> Name: {user.name}</div>
            <div><i className="fas fa-chevron-right" /> Email: {user.email}</div>
            <div><i className="fas fa-chevron-right" /> Role: {user.isTutor && 'Tutor'}{user.isAdmin && 'Admin'}{user.isStudent && 'Student'}</div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default observer(ProfileDetail)
