import { types } from "mobx-state-tree";
import GeneralPageModel from "../../pages/GeneralPageModel";
import Classes from "../../models-one-entity/Classes";

const ClassListPageModel = types.compose(
  'ClassListPage',
  GeneralPageModel,
  types.model({
    classes: types.optional(Classes, {})
  })
)
  .actions(self => ({
    onDidMount() {
      throw new Error('!override onDidMount()')
    }
  }))

export default ClassListPageModel
