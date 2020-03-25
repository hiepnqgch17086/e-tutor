import React from 'react'
import { observer } from 'mobx-react-lite'
import { Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap'
import BtnAddStudent from './MainForm/BtnAddStudent'
import BtnAddTutor from './MainForm/BtnAddTutor'

const MainForm = () => {
  return (
    <div className="card">
      <div className="card-body">
        <Form onSubmit={e => e.preventDefault()}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">Title</Label>
                <Input type="text" name="text" id="title" placeholder="title" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Description</Label>
                <Input type="textarea" name="text" id="description" placeholder="description" />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">
                  Tutor{` `}
                </Label> <br />
                <BtnAddTutor />
              </FormGroup>
            </Col>

            <Col md="6">
              <FormGroup>
                <Label for="exampleEmail">
                  Students{` `}
                </Label> <br />
                <BtnAddStudent />
              </FormGroup>
              <FormGroup>
                <Button>
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
