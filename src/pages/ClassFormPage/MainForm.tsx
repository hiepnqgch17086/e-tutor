import React from 'react'
import { observer } from 'mobx-react-lite'
import { Form, FormGroup, Label, Col, Input } from 'reactstrap'

const MainForm = () => {
  return (
    <Form>
      <FormGroup row>
        <Label for="exampleEmail" sm={2}>Email</Label>
        <Col sm={10}>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </Col>
      </FormGroup>
    </Form>
  )
}

export default observer(MainForm)
