import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, FormGroup, Label, Input, Col, Row, Spinner } from 'reactstrap';
import { defaultOfUser } from '../../models-one-entity/Users';
import firebase from 'firebase'
import avatarDemo from '../../images/avatar-demo.png'
import ImageUploader from 'react-images-upload';

const MainForm = ({
  cloneCurrentUser = defaultOfUser,
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
        .ref(`avatars/${cloneCurrentUser.id}`)
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
            firebase.storage().ref(`avatars/${cloneCurrentUser.id}`)
              .getDownloadURL()
              .then(url => {
                // console.log(url)
                cloneCurrentUser.setAvatar(url)
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
              <img width="200px" height="200px" src={imagePreview || cloneCurrentUser.avatar || avatarDemo} alt="Card cap" />
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
              <Label for="exampleSelect">Gender *</Label>
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
              <Label for="examplePhone">Phone *</Label>
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
              <Label for="address">Address *</Label>
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
              <Label for="dateOfBirth">Date Of Birth *</Label>
              <Input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="dateOfBirth"
                value={cloneCurrentUser.dob}
                onChange={e => {
                  //@ts-ignore
                  cloneCurrentUser.setDob(e.target.value)
                  // console.log(currentUser.dob)
                }}
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
