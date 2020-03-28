import { types } from "mobx-state-tree";

export const createdAt = types.model({
  createdAt: types.optional(
    types.union(types.string, types.number, types.null),
    null
  )
})
  .actions(self => ({
    _setCreatedAtNow(): void {
      // self.createdAt = Date.now()
      // api will handle
    }
  }))

export const updatedAt = types.model({
  updatedAt: types.optional(
    types.union(types.string, types.number, types.null),
    null
  )
})
  .actions(self => ({
    _setUpdatedAtNow(): void {
      // self.updatedAt = Date.now()
      // api will handle
    }
  }))

export const startAt = types.model({
  startAt: types.optional(
    types.union(types.string, types.number),
    ""
  ),
  isStartAtError: types.maybeNull(types.boolean)
})
  .actions(self => {
    return {
      _getStartAtConstraint(): string {
        if (!self.startAt) {
          this._setIsStartAtError(true)
          return 'Start At is required!'
        }
        this._setIsStartAtError(false)
        return ''
      },
      _setIsStartAtError(newValue: boolean) {
        self.isStartAtError = newValue
      },
      setStartAt(newValue: string | number, shouldValidate: boolean = true) {
        self.startAt = newValue
        if (shouldValidate) {
          // @ts-ignore
          self._getStartAtConstraint()
        }
      }
    }
  })

export const endAt = types.model({
  endAt: types.optional(
    types.union(types.string, types.number),
    ""
  ),
  isEndAtError: types.maybeNull(types.boolean)
})
  .actions(self => {
    return {
      _getEndAtConstraint(): string {
        if (!self.endAt) {
          this._setIsEndAtError(true)
          return 'Start At is required!'
        }
        this._setIsEndAtError(false)
        return ''
      },
      _setIsEndAtError(newValue: boolean) {
        self.isEndAtError = newValue
      },
      setEndAt(newValue: string | number, shouldValidate: boolean = true) {
        self.endAt = newValue
        if (shouldValidate) {
          this._getEndAtConstraint()
        }
      }
    }
  })
