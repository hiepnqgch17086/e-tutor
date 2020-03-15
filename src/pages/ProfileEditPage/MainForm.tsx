import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import { SIGN_IN_PAGE } from '../../routes'
import { Button, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import ProfilePageData from '../ProfilePage/data';

const MainForm = () => {
  const { currentUser } = ProfilePageData
  const [isCallingApi, setIsCallingApi] = useState(false)
  return (
    <Row>
      <Col md="6" sm="12">
        {/* Name */}
        <FormGroup>
          <Label for="exampleName">Name</Label>
          <Input type="text" name="name" id="exampleName" placeholder="name"
            value={currentUser.name}
            onChange={(e) => {
              currentUser.setName(e.target.value)
              // console.log(currentUser.name)
            }}
          />
        </FormGroup>

        {/* Gender */}
        <FormGroup>
          <Label for="exampleSelect">Gender</Label>
          <Input type="select" name="select" id="exampleSelect"
            value={currentUser.gender}
            onChange={(e) => {
              currentUser.setGender(e.target.value)
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
            value={currentUser.phone}
            onChange={e => {
              currentUser.setPhone(e.target.value)
              // console.log(currentUser.phone)
            }}
          />
        </FormGroup>

        {/* Address */}
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" placeholder="address"
            value={currentUser.address}
            onChange={e => {
              currentUser.setAddress(e.target.value)
              // console.log(currentUser.address)
            }}
          />
        </FormGroup>

        {/* Date of birth */}
        <FormGroup>
          <Label for="dateOfBirth">Date Of Birth</Label>
          <Input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="dateOfBirth"
            onChange={e => {
              //@ts-ignore
              currentUser.setDob(e.target.value)
              // console.log(currentUser.dob)
            }}
          />
        </FormGroup>

      </Col>


      <Col md="6" sm="12">
        {/* Email */}
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="email"
            value={currentUser.email}
            onChange={e => {
              currentUser.setEmail(e.target.value)
              // console.log(currentUser.email)
            }}
          />
        </FormGroup>

        {/* Password */}
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder"
            value={currentUser.password}
            onChange={e => {
              currentUser.setPassword(e.target.value)
              // console.log(currentUser.password)
            }}
          />
        </FormGroup>

        {/* Repeat password */}
        <FormGroup>
          <Label for="exampleRepeatPassword">Repeat Password</Label>
          <Input type="password" name="password" id="exampleRepeatPassword" placeholder="repeat password"
            value={currentUser.repeatPassword}
            onChange={e => {
              currentUser.setRepeatPassword(e.target.value)
              // console.log(currentUser.repeatPassword)
            }}
          />
        </FormGroup>
        <div>
          Have an account?
            <Link to={SIGN_IN_PAGE}> Login</Link> instead
          </div>
        <Button
          disabled={isCallingApi}
          onClick={async () => {
            setIsCallingApi(true)
            const err = await currentUser.setDatabaseUpdate()
            setIsCallingApi(false)
            if (err) {
              toast.error(err)
              return
            }

          }}
        >Submit</Button>
      </Col>
    </Row>
  )
}

export default observer(MainForm)
