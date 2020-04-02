import { types } from "mobx-state-tree";
import setSnapshotNew from "../../models-one-action/setSnapshotNew";
import Users from "../../models-one-entity/Users";

const AllUsersPageData = types.compose(
  'AllUsersPageData',
  setSnapshotNew,
  types.model({
    users: types.optional(Users, {}),
    // emailForSearching: types.optional(types.string, '')
  })
)
  .actions(self => ({
    onDidMount() {
      // get all users
      // this.getDatabase()
    },
    onWillUnMount() {
      self.setSnapshotNew({})
    },
    // onSearchUsersByEmail(email: string) {
    //   self.setPage(1)
    //   email
    //     ? self.users.getDatabaseItemsByEmail({ email, limit: self.limit, page: self.page })
    //     : self.users.getDatabaseItems({ limit: self.limit, page: self.page })
    //   // console.log(email)
    // },
    // getDatabase: function () {
    //   self.users.getDatabaseItems({ page: self.page, limit: self.limit })
    // },
    // setEmailForSearching(newValue: string = '') {
    //   self.emailForSearching = newValue
    // }
  })).create({})

export default AllUsersPageData
