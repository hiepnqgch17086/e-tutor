export type ErrorMessage = string

/**
 * define response for calling api
 */
export type Response = {
  isSuccess?: boolean,
  errorMessage?: string,
  data?: {
    id?: string
  } | any,
}

export type ConstraintKey = string

export type SetDatabaseNewProps = {
  url?: string
}

export type PaginationType = {
  page: number
  limit: number
  email?: string
  title?: string
}

// export type PaginationEmail = {
//   page: number,
//   limit: number,
// }
