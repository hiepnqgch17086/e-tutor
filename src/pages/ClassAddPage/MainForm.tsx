import React from 'react'
import { observer } from 'mobx-react-lite'
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap'
import CustomInput from '../../components-in-managing-resources/CustomInput'
import BtnAddStudent from './MainForm/BtnAddStudent'
import ListOfJoinedStudents from './ListOfJoinedStudents'
import BtnAddTutor from './MainForm/BtnAddTutor'
import Data from './data'
import CustomTextArea from '../../components-in-managing-resources/CustomTextArea'

const MainForm = () => {
  const { joinedStudents, onSubmitForm, class: thisClass } = Data
  return (
    <div className="card">
      <div className="card-body">
        <Form onSubmit={e => e.preventDefault()}>

          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">Title</Label>
                <CustomInput
                  error={thisClass.isTitleError}
                  value={thisClass.title}
                  onChangeText={thisClass.setTitle}
                  placeholder="title"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Description</Label>
                <CustomTextArea
                  error={thisClass.isDescriptionError}
                  value={thisClass.description}
                  onChangeText={thisClass.setDescription}
                  placeholder="description"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">
                  Tutor{` `}
                </Label> <br />
                <BtnAddTutor />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <FormGroup>
                <Label for="exampleEmail">
                  Students{` `}
                </Label> <br />
                <ListOfJoinedStudents joinedStudents={joinedStudents} />
                <BtnAddStudent />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <Button onClick={onSubmitForm}>
                  Submit
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default observer(MainForm)
