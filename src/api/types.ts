export type User = {
  id?: string | number,
  role?: string | number,
}

export type PaginationType = {
  limit?: number
  page?: number
  emailContains?: string
}
