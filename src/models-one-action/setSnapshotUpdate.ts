import { types, IStateTreeNode } from "mobx-state-tree";
import { ErrorMessage } from "../models-one-entity/types";

const setSnapshotUpdate = types.model({})
  .actions(self => ({
    setSnapshotUpdate(snapshot: Object = {}, target: IStateTreeNode = self): ErrorMessage {
      for (const key in snapshot) {
        if (target.hasOwnProperty(key)) {
          //@ts-ignore
          target[key] = snapshot[key];
          continue
        }
        return 'Wrong property: ' + key
      }
      return ''
    }

  }))

export default setSnapshotUpdate
