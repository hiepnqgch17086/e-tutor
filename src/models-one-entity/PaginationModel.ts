import { types } from "mobx-state-tree";

const PaginationModel = types.model({
  limit: types.optional(types.number, 10),
  page: types.optional(types.number, 1),
  emailContains: types.optional(types.string, ''),
  textContains: types.optional(types.string, ''),
})
  .actions(self => ({
    setLimit(newValue: number = 10, shouldSetPage1: boolean = true) {
      self.limit = newValue
      if (shouldSetPage1) this.setPage(1)
    },
    setPage(newValue: number = 1) {
      self.page = newValue
    },
    setEmailContains(newValue: string = '', shouldSetPage1: boolean = true) {
      self.emailContains = newValue
      if (shouldSetPage1) this.setPage(1)
    },
    setTextContains(newValue: string = '', shouldSetPage1: boolean = true) {
      self.textContains = newValue
      if (shouldSetPage1) this.setPage(1)
    }
  }))

export default PaginationModel

export const defaultOfPagination = PaginationModel.create({})
