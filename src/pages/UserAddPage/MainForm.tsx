import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, FormGroup, Label, Col, Row } from 'reactstrap';
import { defaultOfUser } from '../../models-one-entity/Users';
import CustomInput from '../../components-in-managing-resources/CustomInput';
import CustomSelect from '../../components-in-managing-resources/CustomSelect';
import { IS_STUDENT, IS_TUTOR, IS_ADMIN } from '../../models-one-prop/role';
import { useHistory } from 'react-router-dom';
import { USERS_PAGE } from '../../routes';

const MainForm = ({
  user = defaultOfUser,
  onSaveForm = (callback: Function) => { },
}) => {
  const [isCallingApi] = useState(false)

  const history = useHistory()

  const onSaveFormSuccess = () => {
    history.push(USERS_PAGE)
  }

  return (
    <div className="card">
      <div className="card-body">
        <Row>



          <Col md="6">
            {/* Name */}
            <FormGroup>
              <Label for="exampleName">Role *</Label>
              <CustomSelect
                error={user.isRoleError}
                value={user.role}
                onChangeText={(role: string) => user.setRole(parseInt(role))}
                data={[
                  {
                    value: IS_STUDENT,
                    label: "Student"
                  },
                  {
                    value: IS_TUTOR,
                    label: "Tutor"
                  },
                  {
                    value: IS_ADMIN,
                    label: "Admin"
                  }
                ]}
              />
            </FormGroup>
            {/* Name */}
            <FormGroup>
              <Label for="exampleName">Name *</Label>
              <CustomInput
                error={user.isNameError}
                value={user.name}
                onChangeText={user.setName}
                placeholder="name"
              />
            </FormGroup>

            {/* Gender */}
            <FormGroup>
              <Label for="exampleSelect">Gender *</Label>
              <CustomSelect
                error={user.isGenderError}
                value={user.gender}
                onChangeText={user.setGender}
                data={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />

            </FormGroup>

            {/* Phone */}
            <FormGroup>
              <Label for="examplePhone">Phone *</Label>
              <CustomInput
                error={user.isPhoneError}
                value={user.phone}
                onChangeText={user.setPhone}
                placeholder="0962xxxxxx"
              />
            </FormGroup>

            {/* Address */}
            <FormGroup>
              <Label for="address">Address *</Label>
              <CustomInput
                error={user.isAddressError}
                value={user.address}
                onChangeText={user.setAddress}
                placeholder="address"
              />
            </FormGroup>

            {/* Date of birth */}
            <FormGroup>
              <Label for="dateOfBirth">Date Of Birth *</Label>
              <CustomInput
                error={user.isDobError}
                value={user.dob}
                onChangeText={user.setDob}
                placeholder="dateOfBirth"
                type="date"
              />
            </FormGroup>


          </Col>

          <Col md="6">
            {/* Email */}
            <FormGroup>
              <Label for="exampleName">Email *</Label>
              <CustomInput
                error={user.isEmailError}
                value={user.email}
                onChangeText={user.setEmail}
                placeholder="email"
                type="email"
              />
            </FormGroup>

            {/* Password */}
            <FormGroup>
              <Label for="exampleName">Password *</Label>
              <CustomInput
                error={user.isPasswordError}
                value={user.password}
                onChangeText={user.setPassword}
                placeholder="password"
                type="password"
              />
            </FormGroup>

            {/* Repeat Password */}
            <FormGroup>
              <Label for="exampleName">Repeat Password *</Label>
              <CustomInput
                error={user.isRepeatPasswordError}
                value={user.repeatPassword}
                onChangeText={user.setRepeatPassword}
                placeholder="repeat password"
                type="password"
              />
            </FormGroup>

            <Button
              disabled={isCallingApi}
              onClick={() => onSaveForm(onSaveFormSuccess)}
            >Submit</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default observer(MainForm)
