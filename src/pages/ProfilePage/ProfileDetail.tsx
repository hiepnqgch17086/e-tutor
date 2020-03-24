import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser } from '../../models-one-entity/Users'
import { Row, Col } from 'reactstrap'

const ProfileDetail = ({
  user = defaultOfUser
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <Row>
          <Col md={4} sm={12} className="d-flex flex-column align-items-center">
            <img width="200px" height="200px" src={user.avatar} alt="Card cap" />
            <h4 className="mt-2 text-dark">{user.name}</h4>
          </Col>
          <Col md={8} sm={12}>
            <div>+ Email: {user.email}</div>
            <div>+ Gender: {user.gender}</div>
            <div>+ Phone: {user.phone}</div>
            <div>+ Address: {user.address}</div>
            <div>+ Date of birth: {user.dob}</div>
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default observer(ProfileDetail)
