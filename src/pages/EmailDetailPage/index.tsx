import React from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'
import moment from 'moment'

const EmailDetailPage = () => {
  return (
    <>
      <h3 className="text-dark">Email detail</h3>
      <Card>
        <CardBody>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <span className="font-12 text-nowrap d-block text-muted">{moment().calendar()}</span>
        </CardBody>
      </Card>
    </>
  )
}

export default EmailDetailPage
