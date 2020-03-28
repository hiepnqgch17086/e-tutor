import { types, getType, getSnapshot } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Class } from "../../models-one-entity/Classes";
import Users, { User } from "../../models-one-entity/Users";

const ClassAddPageData = types.compose(
  'ClassAddPageData',
  GeneralPageModel,
  types.model({
    class: types.optional(Class, {}),
    joinedStudents: types.optional(Users, {}),
    tutor: types.optional(User, {})
  })
)
  .actions(self => ({
    onDidMount(classId: string) {

    },
    onSubmitForm() {
      console.log(getSnapshot(self.class))
    }
  }))
  .create({})

export default ClassAddPageData
