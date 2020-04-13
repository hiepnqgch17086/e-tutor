import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'
import CardsCounterOfStudentsTutors from '../../../components/Dashboard/CardsCounterOfStudentsTutors'
import TableOfMemberNotInteractive from './TableOfMemberNotInteractive'
import SearchBar from '../../../components-in-managing-resources/SearchBar'
import PaginationBar from '../../../components-in-managing-resources/PaginationBar'
import SlNumberOfDays from './SlNumberOfDays'

const ForAdmin = () => {
  const { totalOfStudents, totalOfTutors, totalOfStudentsWhoNotHaveTutor } = Data

  const [numberOfDays, setNumberOfDays] = useState(7)

  useEffect(() => {
    Data.onDidMountDidUpdate(numberOfDays)
  }, [numberOfDays])

  return (
    <div>
      <CardsCounterOfStudentsTutors
        numberOfStudents={totalOfStudents}
        numberOfTutors={totalOfTutors}
        numberOfStudentsWhoNotHaveTutor={totalOfStudentsWhoNotHaveTutor}
      />

      <div className="card">
        <div className="row">
          <div className="col-md-12">
            <div className="card-body p-2">
              <h4 className="card-title">
                Students who not interative
                <SlNumberOfDays
                  numberOfDays={numberOfDays}
                  setNumberOfDay={(numberOfDays: number) => {
                    setNumberOfDays(numberOfDays)
                    Data.studentsNotInteractive.setPage(1)
                    Data.getDatabaseStudentsNotInteractive(numberOfDays)
                  }}
                  className=""
                />
              </h4>
            </div>

            <div className="m-2 mt-0">
              <SearchBar
                setPropInput={(text: string) => {
                  Data.studentsNotInteractive.setTextContains(text)
                  Data.getDatabaseStudentsNotInteractive(numberOfDays)
                }}
                placeholder="email, name of student"
              />
            </div>
            <TableOfMemberNotInteractive
              users={Data.studentsNotInteractive}
            // meetings={Data.meetingsByPagination}
            />
            <div className="d-flex justify-content-center">
              <PaginationBar
                page={Data.studentsNotInteractive.page}
                setPage={(pageNumber: number) => {
                  Data.studentsNotInteractive.setPage(pageNumber)
                  Data.getDatabaseStudentsNotInteractive(numberOfDays)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(ForAdmin)
