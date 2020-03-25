import React from 'react'
import { PaginationLink, PaginationItem, Pagination } from 'reactstrap'
import { observer } from 'mobx-react-lite'

const PaginationBar = ({
  page = 1,
  setPage = (page: number) => { }
}) => {
  const onNextPage = () => {
    setPage(page + 1)
  }

  const onPrevPage = () => {
    if (page === 1) return
    setPage(page - 1)
  }

  const onFirstPage = () => {
    setPage(1)
  }

  return (
    <Pagination aria-label="Page navigation example">
      <PaginationItem disabled={page === 1 ? true : false} onClick={onFirstPage}>
        <PaginationLink first />
      </PaginationItem>
      <PaginationItem disabled={page === 1 ? true : false} onClick={onPrevPage}>
        <PaginationLink previous />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink>
          {page}
        </PaginationLink>
      </PaginationItem>
      <PaginationItem onClick={onNextPage}>
        <PaginationLink next />
      </PaginationItem>
    </Pagination>
  )
}

export default observer(PaginationBar)
