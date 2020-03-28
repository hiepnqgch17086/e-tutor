import { types } from "mobx-state-tree";
import setSnapshotNew from "../models-one-action/setSnapshotNew";
import setSnapshotUpdate from "../models-one-action/setSnapshotUpdate";
import PaginationModel from "./PaginationModel";

const GeneralModelList = types.compose(
  'GeneralModelList',
  setSnapshotNew,
  setSnapshotUpdate,
  PaginationModel,
)
  .actions(self => ({

  }))

export default GeneralModelList
