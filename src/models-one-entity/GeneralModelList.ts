import { types } from "mobx-state-tree";
import setSnapshotNew from "../models-one-action/setSnapshotNew";
import setSnapshotUpdate from "../models-one-action/setSnapshotUpdate";

const GeneralModelList = types.compose(
  'GeneralModelList',
  setSnapshotNew,
  setSnapshotUpdate
)
  .actions(self => ({

  }))

export default GeneralModelList
