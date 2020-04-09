import { types } from "mobx-state-tree";
import GeneralPageModel from "../../pages/GeneralPageModel";
import API from "../../api";
import { toast } from "react-toastify";

const AdminLayoutData = types.compose(
  'AdminLayoutData',
  GeneralPageModel,
  types.model({
    numberOfMeetingsToday: types.optional(types.union(types.number, types.string), '')
  })
)
  .actions(self => ({
    setComponent_NumberOfMeetingsToday_onDidMountDidUpdate: async function () {
      // get database
      try {
        const {
          data: { numberOfMeetingsToday },
          errorMessage
        } = await API.getNumberOfMeetingsToday()
        if (errorMessage) throw new Error(errorMessage)
        // console.log('numberOfMeetingsToday', numberOfMeetingsToday)
        self.setSnapshotUpdate({ numberOfMeetingsToday })
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
      }


    },
    setComponent_NumberOfMeetingsToday_onWillUnMount() {
      self.setSnapshotUpdate({ numberOfMeetingsToday: '' })
    },
  }))
  .create({ numberOfMeetingsToday: 2 })

export default AdminLayoutData
