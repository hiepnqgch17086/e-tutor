import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Data from '../data'
import { useLocation } from 'react-router-dom'
import { CHAT_ROOM_TUTOR_PAGE, CHAT_ROOM_STUDENT_PAGE } from '../../../routes'

const NumberOfLastMessagesIsNotSeenByAuth = () => {
  const { numberOfLastMessagesIsNotSeenByAuth } = Data
  const location = useLocation()
  const pathName = location.pathname

  const temp = [CHAT_ROOM_TUTOR_PAGE, CHAT_ROOM_STUDENT_PAGE]
  const isChatActive = temp.indexOf(pathName) >= 0

  useEffect(() => {
    // console.log(isChatActive)
    if (isChatActive) {
      Data.NumberOfLastMessagesIsNotSeenByAuth_onWillUnMount()

    } else {
      Data.NumberOfLastMessagesIsNotSeenByAuth_onDidMountDidUpdate()
    }
    // effect
    return () => {
      Data.NumberOfLastMessagesIsNotSeenByAuth_onWillUnMount()
    }
  }, [isChatActive])

  return (
    <span>
      {' '}{numberOfLastMessagesIsNotSeenByAuth ? `(${numberOfLastMessagesIsNotSeenByAuth})` : ''}
    </span>
  )
}

export default observer(NumberOfLastMessagesIsNotSeenByAuth)
