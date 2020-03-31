import React from 'react'
import { observer } from 'mobx-react-lite'
import { Form, FormGroup, Label, Row, Col, Button } from 'reactstrap'
import CustomInput from '../../components-in-managing-resources/CustomInput'
import BtnAddStudent from './MainForm/BtnAddStudent'
import ListOfJoinedStudents from './MainForm/ListOfJoinedStudents'
import BtnAddTutor from './MainForm/BtnAddTutor'
import Data from './data'
import CardOfTutorInfo from './MainForm/CardOfTutorInfo'
import { useHistory } from 'react-router-dom'
import { CLASS_LIST_PAGE } from '../../routes'
import moment from 'moment'

const MainForm = () => {
  const { joinedStudents, onSubmitForm, class: thisClass, tutor } = Data

  let history = useHistory()
  const onSubmitSucess = () => {
    history.push(CLASS_LIST_PAGE)
  }

  const onChangeStartAt = (dateString: string) => {
    const date = new Date(dateString)
    thisClass.setStartAt(date.valueOf())
  }

  const onChangeEndAt = (dateString: string) => {
    const date = new Date(dateString)
    thisClass.setEndAt(date.valueOf())
  }

  return (
    <div className="card">
      <div className="card-body">
        <Form onSubmit={e => e.preventDefault()}>

          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">Title *</Label>
                <CustomInput
                  error={thisClass.isTitleError}
                  value={thisClass.title}
                  onChangeText={thisClass.setTitle}
                  placeholder="title"
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Description *</Label>
                <CustomInput
                  error={thisClass.isDescriptionError}
                  value={thisClass.description}
                  onChangeText={thisClass.setDescription}
                  placeholder="description"
                  type="textarea"
                />
              </FormGroup>
              {/* Start At */}
              <FormGroup>
                <Label for="exampleEmail">Start At *</Label>
                <CustomInput
                  error={thisClass.isStartAtError}
                  value={moment(thisClass.startAt).format('YYYY-MM-DD')}
                  onChangeText={onChangeStartAt}
                  type="date"
                />
              </FormGroup>
              {/* End At */}
              <FormGroup>
                <Label for="exampleEmail">End At *</Label>
                <CustomInput
                  error={thisClass.isEndAtError}
                  value={moment(thisClass.endAt).format('YYYY-MM-DD')}
                  onChangeText={onChangeEndAt}
                  type="date"
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">
                  Tutor *
                </Label> <br />
                <CardOfTutorInfo user={tutor} />
                <BtnAddTutor />
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <FormGroup>
                <Label for="exampleEmail">
                  Students *
                </Label> <br />
                <ListOfJoinedStudents joinedStudents={joinedStudents} />
                <BtnAddStudent />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <Button onClick={() => onSubmitForm(onSubmitSucess)}>
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
