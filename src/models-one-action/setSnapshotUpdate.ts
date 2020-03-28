import { types, IStateTreeNode } from "mobx-state-tree";
import { ErrorMessage } from "../models-one-entity/types";

type KEYS = Array<string>

/**
 * set snapshot for target, or setSnapshot for target with given keys
 */
const setSnapshotUpdate = types.model({})
  .actions(self => ({
    setSnapshotUpdate(snapshot: Object = {}, target: IStateTreeNode = self, keys: KEYS = []): ErrorMessage {
      /// case 1
      if (keys.length) {
        for (const key in snapshot) {
          //@ts-ignore
          if (target.hasOwnProperty(key) && keys.indexOf(key) >= 0) {
            //@ts-ignore
            target[key] = snapshot[key];
            continue
          }
          return 'Wrong property: ' + key
        }
        return ''
      }
      /// case 2
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
