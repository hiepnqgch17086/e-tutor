export type ErrorMessage = string

/**
 * define response for calling api
 */
export type Response = {
  isSuccess: boolean,
  errorMessage?: string,
  data?: {
    id?: string
  } | any,
}

export type ConstraintKey = string

export type SetDatabaseNewProps = {
  url?: string
}
