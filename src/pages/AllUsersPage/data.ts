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
      this.getDatabase()
    },
    onWillUnMount() {
      self.setSnapshotNew({})
    },
    onSearchUsersByEmail(email: string) {
      email
        ? self.users.getDatabaseItemsByEmail(email)
        : self.users.getDatabaseItems()
      // console.log(email)
    },
    getDatabase: function () {
      self.users.getDatabaseItems()
    },
    // setEmailForSearching(newValue: string = '') {
    //   self.emailForSearching = newValue
    // }
  })).create({})

export default AllUsersPageData
