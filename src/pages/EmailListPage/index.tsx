import React, { useEffect } from 'react'
import MainList from './MainList'
import Emails from '../../models-one-entity/Emails'
import SlNumberOfItems from '../../components-in-managing-resources/SlNumberOfItems'
import PaginationBar from '../../components-in-managing-resources/PaginationBar'
import { observer } from 'mobx-react-lite'

const emailList = Emails.create({})

const EmailListPage = () => {
  const { limit, page } = emailList

  useEffect(() => {
    emailList.getDatabaseAuthEmails()
  }, [limit, page])

  return (
    <div>
      {/* <h3 className="text-dark">Emails</h3> */}
      <SlNumberOfItems
        limit={emailList.limit}
        setLimit={emailList.setLimit}
      />
      <MainList emailList={emailList} />
      <PaginationBar
        page={emailList.page}
        setPage={emailList.setPage}
      />
    </div>
  )
}

export default observer(EmailListPage)
