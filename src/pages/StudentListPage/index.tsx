import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import MainList from './MainList'
import Data from './data'
import SearchBar from '../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'
import SlNumberOfItems from '../../components-in-managing-resources/SlNumberOfItems'
import SlCategoryOfUser from './SlCategoryOfUser'
import { STUDENTS } from './definitions'
import ListOfTutor from '../TutorListPage/ListOfTutor'
/**
 * FOR ADMIN ONLY
 */
const StudentListPage = () => {

  const [category, setCategory] = useState(STUDENTS)
  const { users } = Data
  const { limit, page, setPage, setLimit, emailContains, setEmailContains } = users

  useEffect(() => {
    // effect
    Data.onDidMountDidUpdate(category)
    return () => {
      // cleanup
      // Data.onWillUnMount()
    }
  }, [category, limit, page, emailContains])

  return (
    <>
      <SearchBar
        setPropInput={setEmailContains}
        placeholder="Enter student/tutor email"
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
      {
        category === STUDENTS && (
          <MainList
            users={users}
          />
        )
      }
      <PaginationBar
        page={page}
        setPage={setPage}
      />
    </>
  )
}

export default observer(StudentListPage)
