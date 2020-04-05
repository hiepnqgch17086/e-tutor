import { types, getType, applySnapshot, getSnapshot, IStateTreeNode } from "mobx-state-tree";
import { ErrorMessage } from "../models-one-entity/types";

const setSnapshotNew = types.model({})
  .actions(self => ({
    setSnapshotNew(snapshot: Object | null | Array<any> = {}, target: IStateTreeNode = self): ErrorMessage {
      try {
        const temp = getType(target).create(snapshot)
        applySnapshot(target, getSnapshot(temp))
        return ''
      } catch (error) {
        return error.message
      }
    }

  }))

export default setSnapshotNew
