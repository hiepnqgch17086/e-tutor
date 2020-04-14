import { User } from "../../../../models-one-entity/Users";
import { types } from "mobx-state-tree";
import setSnapshotNew from "../../../../models-one-action/setSnapshotNew";

export const newTutor = User.create({})

export const shouldForceChange = types.compose(
  types.model({
    shouldForceChange: types.optional(types.boolean, false)
  }),
  setSnapshotNew,
)
  .actions(self => ({
    setToggle() {
      self.shouldForceChange = !self.shouldForceChange
    }
  }))
  .create({})
