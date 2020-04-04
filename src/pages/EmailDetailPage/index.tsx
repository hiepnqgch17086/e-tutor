import React, { useEffect } from 'react'
import { Card, CardBody, CardTitle, CardText } from 'reactstrap'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { Email } from '../../models-one-entity/Emails'
import { observer } from 'mobx-react-lite'

const email = Email.create({})

const EmailDetailPage = () => {
  const { id = '' } = useParams()

  useEffect(() => {
    email.setId(parseInt(id))
    console.log(id)
    email.getDatabase()
    return () => {
      email.setSnapshotNew({})
    }
  }, [])

  return (
    <>
      <h3 className="text-dark">Email detail</h3>
      {
        email.createdAt ? (
          <Card>
            <CardBody>
              <CardTitle>{email.title}</CardTitle>
              <CardText>{email.body}</CardText>
              <span className="font-12 text-nowrap d-block text-muted">{moment(email.createdAt).calendar()}</span>
            </CardBody>
          </Card>
        ) : null
      }

    </>
  )
}

export default observer(EmailDetailPage)
