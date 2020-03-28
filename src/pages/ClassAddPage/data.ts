import { types, getType, getSnapshot } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Class } from "../../models-one-entity/Classes";
import Users, { User } from "../../models-one-entity/Users";
import { toast } from "react-toastify";

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
    onWillUnMount() {
      self.setSnapshotNew({})
    },
    onSubmitForm: async function () {
      try {

        const { class: thisClass, joinedStudents, tutor } = self
        thisClass.setTutorId(tutor.id)
        const { data, errorMessage } = await thisClass.setDatabaseNew()
        if (errorMessage) throw new Error(errorMessage)

        console.log(data)

      } catch (error) {
        toast.error(error.message)
      }
    }
  }))
  .create({})

export default ClassAddPageData
