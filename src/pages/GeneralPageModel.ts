import { types } from "mobx-state-tree";
import setSnapshotNew from "../models-one-action/setSnapshotNew";
import setSnapshotUpdate from "../models-one-action/setSnapshotUpdate";

const GeneralPageModel = types.compose(
  'GeneralPageModel',
  setSnapshotNew,
  setSnapshotUpdate,
  types.model({})
)

export default GeneralPageModel
