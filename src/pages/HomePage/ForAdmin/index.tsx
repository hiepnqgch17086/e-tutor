import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import CardListOfCounter from './CardListOfCounter'
import Data from './data'

const ForAdmin = () => {
  const { totalOfStudents, totalOfTutors } = Data

  useEffect(() => {
    Data.onDidMountDidUpdate()
  }, [])

  return (
    <div>
      <CardListOfCounter
        numberOfStudents={totalOfStudents}
        numberOfTutors={totalOfTutors}
      />
    </div>
  )
}

export default observer(ForAdmin)
