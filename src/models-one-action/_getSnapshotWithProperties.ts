import { types } from "mobx-state-tree";
import { ErrorMessage } from "../models-one-entity/types";

/**
 * get properties with keys in definition prop
 */
const _getSnapshotWithProperties = types.model({})
  .actions(self => ({
    _getSnapshotWithProperties(array: Array<string> = []): Object | ErrorMessage {
      const rs = {}
      for (const property of array) {
        if (self.hasOwnProperty(property)) {
          //@ts-ignore
          rs[property] = self[property]
          continue
        }
        return 'Wrong properties, ' + property
      }
      return rs
    }
  }))

export default _getSnapshotWithProperties
