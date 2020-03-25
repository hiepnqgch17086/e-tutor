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
            <div><i className="fas fa-chevron-right" /> Email: {user.email}</div>
            <div><i className="fas fa-chevron-right" /> Gender: {user.gender}</div>
            <div><i className="fas fa-chevron-right" /> Phone: {user.phone}</div>
            <div><i className="fas fa-chevron-right" /> Address: {user.address}</div>
            <div><i className="fas fa-chevron-right" /> Date of birth: {user.dob}</div>
          </Col>
        </Row>

      </div>
    </div>
  )
}

export default observer(ProfileDetail)
