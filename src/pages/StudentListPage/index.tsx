import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import Data from './data'
import SearchBar from '../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'
import SlNumberOfItems from '../../components-in-managing-resources/SlNumberOfItems'
import SlCategoryOfUser from './SlCategoryOfUser'
import { STUDENTS } from './definitions'
import ProfilePageData from '../ProfilePage/data'
import { IS_ADMIN } from '../../models-one-prop/role'
import { HOME_PAGE } from '../../routes'
import { useHistory } from 'react-router-dom'
/**
 * FOR ADMIN ONLY
 */
const StudentListPage = () => {
  const history = useHistory()

  const [category, setCategory] = useState(STUDENTS)
  const { users } = Data
  const { limit, page, setPage, setLimit, emailContains, setEmailContains } = users

  useEffect(() => {
    // validate for ADMIN
    if (ProfilePageData.currentUser.role === IS_ADMIN) {
      Data.onDidMountDidUpdate(category)
      // eslint-disable-next-line
    } {
      history.push(HOME_PAGE)
    }
    // eslint-disable-next-line
  }, [category, limit, page, emailContains])

  return (
    <>
      <SearchBar
        setPropInput={setEmailContains}
        placeholder="student email"
      />
      <div className="d-flex">
        <SlNumberOfItems
          limit={limit}
          setLimit={setLimit}
        />
        <SlCategoryOfUser
          category={category}
          setCategory={setCategory}
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

export default observer(StudentListPage)
