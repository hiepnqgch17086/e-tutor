import { types } from "mobx-state-tree";

const PaginationModel = types.model({
  limit: types.optional(types.number, 10),
  page: types.optional(types.number, 1),
  searchByEmail: types.optional(types.string, ''),
  searchByTitle: types.optional(types.string, ''),
  searchByCategory: types.optional(types.number, 0),
})
  .actions(self => ({
    setLimit(newValue: number = 10) {
      self.limit = newValue
    },
    setPage(newValue: number = 1) {
      self.page = newValue
    },
    setSearchByCategory(categoryKey: number) {
      self.searchByCategory = categoryKey
    },
    setSearchByEmail(newValue: string = '') {
      self.searchByEmail = newValue
    },
    setSearchByTitle(newValue: string = '') {
      self.searchByTitle = newValue
    }
  }))

export default PaginationModel
