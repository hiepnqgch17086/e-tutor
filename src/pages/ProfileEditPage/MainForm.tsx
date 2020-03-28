import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, FormGroup, Label, Input, Col, Row, Spinner } from 'reactstrap';
import { defaultOfUser } from '../../models-one-entity/Users';
import firebase from 'firebase'
import avatarDemo from '../../images/avatar-demo.png'
import ImageUploader from 'react-images-upload';
import CustomInput from '../../components-in-managing-resources/CustomInput';
import CustomSelect from '../../components-in-managing-resources/CustomSelect';

const MainForm = ({
  user = defaultOfUser,
  onSaveForm = () => { },
}) => {
  const [isCallingApi] = useState(false)

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const onDrop = (files: File[], pictures: string[]) => {
    // @ts-ignore
    setImageFile(files[0])
    setImagePreview(pictures[0])
  }

  const _onSaveForm = (e: any) => {
    if (imageFile) {
      setIsUploadingImage(true)
      // const imageFile = e.target.files[0]
      // setImageFile(image)
      firebase.storage()
        .ref(`avatars/${user.id}`)
        //@ts-ignore
        .put(imageFile)
        .on('state_changed',
          () => {
            // setIsUploadingImage(false)
          },
          (error: any) => {
            console.log(error)
            // setIsUploadingImage(false)
          },
          () => {
            firebase.storage().ref(`avatars/${user.id}`)
              .getDownloadURL()
              .then(url => {
                // console.log(url)
                user.setAvatar(url)
                setIsUploadingImage(false)
                onSaveForm()
              })
          }
        )
    } else {
      onSaveForm()
    }


  }

  return (
    <div className="card">
      <div className="card-body">
        <Row>
          <Col md="4" sm="12">
            <FormGroup row className="d-flex flex-column align-items-center">
              {isUploadingImage ? (
                <Spinner color="primary" />
              ) : null}
              <img width="200px" height="200px" src={imagePreview || user.avatar || avatarDemo} alt="Card cap" />
            </FormGroup>
            <FormGroup row>
              <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={(files, pictures) => onDrop(files, pictures)}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                singleImage={true}
              />
            </FormGroup>

          </Col>


          <Col md="8" sm="12">
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
              onClick={_onSaveForm}
            >Submit</Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default observer(MainForm)
