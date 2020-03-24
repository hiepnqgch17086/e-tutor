import React from 'react'
import { observer } from 'mobx-react-lite'
import { Card, CardTitle, CardText, Button } from 'reactstrap'

const MainList = () => {
  return (
    <div>
      <Card body>
        <CardTitle>Class title</CardTitle>
        <CardText>Class description</CardText>
        <Button>Go Class</Button>
      </Card>
    </div>
  )
}

export default observer(MainList)
