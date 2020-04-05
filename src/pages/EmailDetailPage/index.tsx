import React, { useEffect } from 'react'
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import { Email } from '../../models-one-entity/Emails'
import { observer } from 'mobx-react-lite'
import { EMAIL_LIST_PAGE } from '../../routes'

const email = Email.create({})

const EmailDetailPage = () => {
  const { id = '' } = useParams()
  const history = useHistory()

  useEffect(() => {
    // validate
    // if (!ProfilePageData.currentUser.id) {
    //   history.push(HOME_PAGE)
    //   return
    // }
    email.setId(parseInt(id))
    email.getDatabase()
    return () => {
      email.setSnapshotNew({})
    }
  }, [id])

  return (
    <>
      <h3 className="text-dark">Email detail</h3>
      {
        email.createdAt ? (
          <>
            <Card className="mb-2">
              <CardBody>
                <CardTitle>{email.title}</CardTitle>
                <CardText>{email.body}</CardText>
                <span className="font-12 text-nowrap d-block text-muted">{moment(email.createdAt).calendar()}</span>
              </CardBody>
            </Card>
            <Button onClick={() => history.push(EMAIL_LIST_PAGE)}>
              Back to list
          </Button>
          </>
        ) : null
      }

    </>
  )
}

export default observer(EmailDetailPage)
