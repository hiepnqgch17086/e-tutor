import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import Data from './data'
import SearchBar from '../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'
import SlNumberOfItems from '../../components-in-managing-resources/SlNumberOfItems'
import ProfilePageData from '../ProfilePage/data'
import { IS_ADMIN } from '../../models-one-prop/role'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'
/**
 * FOR ADMIN ONLY
 */
const TutorListPage = () => {
  const history = useHistory()
  const { users } = Data
  const { limit, page, setPage, setLimit, emailContains, setEmailContains } = users

  useEffect(() => {
    // validate for ADMIN
    if (ProfilePageData.currentUser.role === IS_ADMIN) {
      Data.onDidMountDidUpdate()
    } else {
      history.push(HOME_PAGE)
    }
    // eslint-disable-next-line
  }, [limit, page, emailContains])

  return (
    <>
      <SearchBar
        initialValue={users.emailContains}
        setPropInput={setEmailContains}
        placeholder="tutor email"
      />
      <div className="d-flex">
        <SlNumberOfItems
          limit={limit}
          setLimit={setLimit}
        />
      </div>
      <MainList
        users={users}
      />
      <PaginationBar
        page={page}
        setPage={setPage}
      />
    </>
  )
}

export default observer(TutorListPage)
