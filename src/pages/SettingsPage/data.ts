import { types } from "mobx-state-tree";
import { toast } from "react-toastify";
import API from "../../api";

const SettingsData = types.model(
  'SettingsData',
  {
    numberOfStudentsPerTutor: types.optional(types.number, 0)
  }
)
  .actions(self => ({
    setNumberOfStudentsPerTutor(newValue: number) {
      self.numberOfStudentsPerTutor = newValue
    },
    getDatabaseNumberOfStudentsPerTutor: async function () {
      try {
        const { errorMessage, data: { result } } = await API.getNumberOfStudentsPerTutor()
        if (errorMessage) throw new Error(errorMessage)
        this.setNumberOfStudentsPerTutor(result)
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    }
  }))
  .create({})

export default SettingsData
