import { types, getType } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Class } from "../../models-one-entity/Classes";

const ClassFormPageModel = types.compose(
  GeneralPageModel,
  types.model({
    class: types.optional(Class, {})
  })
)
  .actions(self => ({
    onDidMount(classId: string) {
      console.log('\n')
      throw new Error(getType(self).name + 'should override onDidMount()')
    }
  }))

const New = types.compose(
  ClassFormPageModel,
  types.model({})
)
  .actions(self => ({
    onDidMount() {
      console.log('Just for overriding')
    }
  }))

const Edit = types.compose(
  ClassFormPageModel,
  types.model({})
)
  .actions(self => ({
    onDidMount() {
      console.log('Developing')
    }
  }))

export default function getData(classId: string) {
  return classId ? Edit : New
}
