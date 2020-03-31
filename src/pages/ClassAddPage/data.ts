import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Class } from "../../models-one-entity/Classes";
import { User } from "../../models-one-entity/Users";
import { toast } from "react-toastify";

const ClassAddPageData = types.compose(
  'ClassAddPageData',
  GeneralPageModel,
  types.model({
    class: types.optional(Class, {}),
    tutor: types.optional(User, {})
  })
)
  .actions(self => ({
    onDidMount(classId: string) {

    },
    onWillUnMount() {
      self.setSnapshotNew({})
    },
    onSubmitForm: async function (callback: Function = () => { }) {
      const { class: thisClass, tutor } = self
      const { members } = thisClass

      // check joinedStudents
      if (!members.length) {
        toast.error("Students are required!")
        return
      }

      thisClass.setTutorId(tutor.id)
      const { errorMessage } = await thisClass.setDatabaseNew()
      if (errorMessage) return

      callback()
    }
  }))
  .create({})

export default ClassAddPageData
