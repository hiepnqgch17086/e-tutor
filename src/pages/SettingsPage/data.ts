import { types } from "mobx-state-tree";
import { toast } from "react-toastify";
import API from "../../api";
import { ErrorMessage } from "../../models-one-entity/types";

const SettingsData = types.model(
  'SettingsData',
  {
    numberOfStudentsPerTutor: types.optional(types.union(types.number, types.string), 0)
  }
)
  .actions(self => ({
    setNumberOfStudentsPerTutor(newValue: any) {
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
    },
    setDatabaseNumberOfStudentsPerTutorUpdate: async function (numb: string | number): Promise<ErrorMessage> {
      try {
        if (!numb || numb < 0) throw new Error('A number which is larger than 0 is required')
        const { errorMessage } = await API.setNumberOfStudentsPerTutorUpdate(numb)
        if (errorMessage) throw new Error(errorMessage)
        // this.setNumberOfStudentsPerTutor(result)
        this.setNumberOfStudentsPerTutor(numb)
        toast.success('Update successfully!')
        return ''
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
        return error.message
      }
    }
  }))
  .create({})

export default SettingsData
