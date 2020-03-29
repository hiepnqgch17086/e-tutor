import { types } from "mobx-state-tree";

export const numberOfStudens = types.model(
  { numberOfStudens: types.optional(types.number, 0) }
)
