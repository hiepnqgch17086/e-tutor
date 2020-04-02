import React from 'react'
import { observer } from 'mobx-react-lite'
import CardListOfCounter from './CardListOfCounter'

const ForAdmin = () => {
  return (
    <div>
      <CardListOfCounter />
    </div>
  )
}

export default observer(ForAdmin)
