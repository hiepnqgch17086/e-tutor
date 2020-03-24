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
      <div className="card">
        <div className="card-body">
          <SearchBar
            onSearchUsersByEmail={onSearchUsersByEmail}
          />
        </div>
      </div>
      <div className="card">
        <MainList
          userArrayList={Data.users.items}
        />
      </div>
    </>
  )
}

export default observer(AllUsersPage)
