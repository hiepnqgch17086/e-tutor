import React from 'react'
import { ModalHeader, ModalBody } from 'reactstrap'

const TitleAndBody = ({
  toggle = () => { }
}) => {
  return (
    <div>
      <ModalHeader toggle={toggle}>Meeting title</ModalHeader>
      <ModalBody>
        [Meeting body]
        </ModalBody>
    </div>
  )
}

export default TitleAndBody
