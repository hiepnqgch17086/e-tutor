import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Data from '../data'

const NumberOfMeetingsToday = () => {
  const { numberOfMeetingsToday } = Data

  useEffect(() => {
    Data.setComponent_NumberOfMeetingsToday_onDidMountDidUpdate()
    return () => {
      Data.setComponent_NumberOfMeetingsToday_onWillUnMount()
    }
  }, [])

  return (
    <>
      {' '}({numberOfMeetingsToday ? numberOfMeetingsToday : ''})
    </>
  )
}

export default observer(NumberOfMeetingsToday)
