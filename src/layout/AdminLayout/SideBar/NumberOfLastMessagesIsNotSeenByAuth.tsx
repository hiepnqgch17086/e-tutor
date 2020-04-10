import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Data from '../data'

const NumberOfLastMessagesIsNotSeenByAuth = () => {
  const { numberOfLastMessagesIsNotSeenByAuth } = Data

  useEffect(() => {
    // effect
    Data.NumberOfLastMessagesIsNotSeenByAuth_onDidMountDidUpdate()
    return () => {
      Data.NumberOfLastMessagesIsNotSeenByAuth_onWillUnMount()
    }
  }, [])

  return (
    <>
      {' '}{numberOfLastMessagesIsNotSeenByAuth ? `(${numberOfLastMessagesIsNotSeenByAuth})` : ''}
    </>
  )
}

export default observer(NumberOfLastMessagesIsNotSeenByAuth)
