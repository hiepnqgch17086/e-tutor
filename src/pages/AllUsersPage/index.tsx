import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import Data from './data'
import SearchBar from './SearchBar'

const AllUsersPage = () => {

  const { onSearchUsersByEmail } = Data

  useEffect(() => {
    // effect
    Data.onDidMount()
    return () => {
      // cleanup
      Data.onWillUnMount()
    }
  }, [])

  return (
    <>
      <SearchBar
        onSearchUsersByEmail={onSearchUsersByEmail}
      />

      <MainList
        userArrayList={Data.users.items}
      />
    </>
  )
}

export default observer(AllUsersPage)
