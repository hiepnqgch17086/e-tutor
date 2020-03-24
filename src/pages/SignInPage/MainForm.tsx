import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Data from './data'

const MainForm = () => {

  return (
    <Form>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
      </FormGroup>
      <Button
        onClick={Data.onSignIn}
      >Submit</Button>

    </Form>
  )
}

export default observer(MainForm)
