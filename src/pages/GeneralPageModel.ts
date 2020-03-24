import { types } from "mobx-state-tree";
import setSnapshotNew from "../models-one-action/setSnapshotNew";

const GeneralPageModel = types.compose(
  'GeneralPageModel',
  setSnapshotNew,
  types.model({})
)

export default GeneralPageModel
