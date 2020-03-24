import React from 'react'
import { observer } from 'mobx-react-lite'
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'

const MainForm = () => {
  return (
    <Form>
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
        </Col>

        <Col md="6">
          <FormGroup>
            <Label for="exampleEmail">Title</Label>
            <Input type="text" name="text" id="title" placeholder="title" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Description</Label>
            <Input type="textarea" name="text" id="description" placeholder="description" />
          </FormGroup>
        </Col>

      </Row>

    </Form>
  )
}

export default observer(MainForm)
