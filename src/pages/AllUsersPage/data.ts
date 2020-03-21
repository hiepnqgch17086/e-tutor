import { types } from "mobx-state-tree";
import setSnapshotNew from "../../models-one-action/setSnapshotNew";
import Users from "../../models-one-entity/Users";
import { toast } from "react-toastify";

const AllUsersPageData = types.compose(
  'AllUsersPageData',
  setSnapshotNew,
  types.model({
    users: types.optional(Users, {})
  })
)
  .actions(self => ({
    onDidMount() {
      // get all users
      this.getDatabase()
    },
    getDatabase: function () {
      self.users.getDatabaseItems()
    }
  })).create({})

export default AllUsersPageData