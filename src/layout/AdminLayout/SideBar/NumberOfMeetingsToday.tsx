import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Data from '../data'
import ProfilePageData from '../../../pages/ProfilePage/data'
import moment from 'moment'

const getStartOfToday = () => moment().startOf('day').toISOString()

const NumberOfMeetingsToday = () => {
  const { numberOfMeetingsToday } = Data
  const { currentUser } = ProfilePageData
  const [count, setCount] = useState(0)
  const [startOfToday, setStartOfToday] = useState(getStartOfToday())

  useEffect(() => {
    // effect: check today, if today is changed, get number of today again
    setTimeout(() => {
      setCount(count + 1)
      const newStartOfToday = getStartOfToday()
      if (newStartOfToday !== startOfToday) setStartOfToday(newStartOfToday)
    }, 1000)
  }, [count, startOfToday])

  useEffect(() => {
    Data.NumberOfMeetingsToday_onDidMountDidUpdate()
    return () => {
      Data.NumberOfMeetingsToday_onWillUnMount()
    }
  }, [currentUser.id, startOfToday])

  return (
    <span>
      {' '}{numberOfMeetingsToday ? `(${numberOfMeetingsToday})` : ''}
    </span>
  )
}

export default observer(NumberOfMeetingsToday)
