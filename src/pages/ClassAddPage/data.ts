import { types, getType, getSnapshot } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Class } from "../../models-one-entity/Classes";
import Users, { User } from "../../models-one-entity/Users";
import { toast } from "react-toastify";
import { CLASS_LIST_PAGE } from "../../routes";

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
    onSubmitForm: async function (callback: Function = () => { }) {
      try {

        const { class: thisClass, joinedStudents, tutor } = self
        thisClass.setTutorId(tutor.id)
        const { data, errorMessage } = await thisClass.setDatabaseNew()
        if (errorMessage) throw new Error(errorMessage)

        console.log(data)
        callback()
      } catch (error) {
        toast.error(error.message)
      }
    }
  }))
  .create({})

export default ClassAddPageData
