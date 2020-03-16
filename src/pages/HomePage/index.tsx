import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'reactstrap'

const HomePage = () => {
  return (
    <div>
      <Button color="primary">primary</Button>
    </div>
  )
}

export default observer(HomePage)
