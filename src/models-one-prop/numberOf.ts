import { types } from "mobx-state-tree";

export const numberOfMembers = types.model(
  { numberOfMembers: types.optional(types.number, 0) }
)
