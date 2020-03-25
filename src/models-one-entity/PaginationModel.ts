import { types } from "mobx-state-tree";

const PaginationModel = types.model({
  limit: types.optional(types.number, 10),
  page: types.optional(types.number, 1),
  searchByEmail: types.optional(types.string, '')
})
  .actions(self => ({
    setLimit(newValue: number = 10) {
      self.limit = newValue
    },
    setPage(newValue: number = 1) {
      self.page = newValue
    },
    setSearchByEmail(newValue: string = '') {
      self.searchByEmail = newValue
    }
  }))

export default PaginationModel
