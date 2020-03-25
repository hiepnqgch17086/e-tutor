import { useState } from "react"

type Pagination = {
  limit: number,
  page: number
  setLimit: Function,
  setPage: Function,
}

const usePagination = (): Pagination => {
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  return {
    limit, page, setLimit, setPage
  }
}

export default usePagination
