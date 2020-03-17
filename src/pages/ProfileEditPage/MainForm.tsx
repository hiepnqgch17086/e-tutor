import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { SIGN_IN_PAGE } from '../../routes'
import { Button, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { defaultOfUser } from '../../models-one-entity/Users';

const MainForm = ({
  cloneCurrentUser = defaultOfUser,
  onSaveForm = () => { }
}) => {
  const [isCallingApi, setIsCallingApi] = useState(false)
  return (
    <Row>
      <Col md="6" sm="12">
        {/* Name */}
        <FormGroup>
          <Label for="exampleName">Name</Label>
          <Input type="text" name="name" id="exampleName" placeholder="name"
            value={cloneCurrentUser.name}
            onChange={(e) => {
              cloneCurrentUser.setName(e.target.value)
              // console.log(currentUser.name)
            }}
          />
        </FormGroup>

        {/* Gender */}
        <FormGroup>
          <Label for="exampleSelect">Gender</Label>
          <Input type="select" name="select" id="exampleSelect"
            value={cloneCurrentUser.gender}
            onChange={(e) => {
              cloneCurrentUser.setGender(e.target.value)
              // console.log(currentUser.gender)
            }}
          >
            <option value="">Select one</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Input>
        </FormGroup>

        {/* Phone */}
        <FormGroup>
          <Label for="examplePhone">Phone</Label>
          <Input type="text" name="phone" id="examplePhone" placeholder="0962xxxxxx"
            value={cloneCurrentUser.phone}
            onChange={e => {
              cloneCurrentUser.setPhone(e.target.value)
              // console.log(currentUser.phone)
            }}
          />
        </FormGroup>

        {/* Address */}
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" placeholder="address"
            value={cloneCurrentUser.address}
            onChange={e => {
              cloneCurrentUser.setAddress(e.target.value)
              // console.log(currentUser.address)
            }}
          />
        </FormGroup>

        {/* Date of birth */}
        <FormGroup>
          <Label for="dateOfBirth">Date Of Birth</Label>
          <Input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="dateOfBirth"
            value={cloneCurrentUser.dob}
            onChange={e => {
              //@ts-ignore
              cloneCurrentUser.setDob(e.target.value)
              // console.log(currentUser.dob)
            }}
          />
        </FormGroup>
      </Col>


      <Col md="6" sm="12">
        {/* Email */}
        {/* <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="email"
            value={cloneCurrentUser.email}
            onChange={e => {
              cloneCurrentUser.setEmail(e.target.value)
              // console.log(currentUser.email)
            }}
          />
        </FormGroup> */}
        <Button
          disabled={isCallingApi}
          onClick={onSaveForm}
        >Submit</Button>
      </Col>
    </Row>
  )
}

export default observer(MainForm)
