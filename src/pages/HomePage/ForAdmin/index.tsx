import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'
import CardsCounterOfStudentsTutors from '../../../components/Dashboard/CardsCounterOfStudentsTutors'

const ForAdmin = () => {
  const { totalOfStudents, totalOfTutors } = Data

  useEffect(() => {
    Data.onDidMountDidUpdate()
  }, [])

  return (
    <div>
      <CardsCounterOfStudentsTutors
        numberOfStudents={totalOfStudents}
        numberOfTutors={totalOfTutors}
      />
    </div>
  )
}

export default observer(ForAdmin)
