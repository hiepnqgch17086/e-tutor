import { types, getParent } from "mobx-state-tree";
import id from "../models-one-prop/id";
import GeneralModel from "./GeneralModel";
import GeneralModelList from "./GeneralModelList";
import { MeetingBase } from "./BaseModels";
import name from "../models-one-prop/name";
import { User } from "./Users";
import path from "../models-one-prop/path";
import API from "../api";
import firebase from 'firebase'
import { toast } from "react-toastify";
import { ErrorMessage } from "./types";

export const MeetingFileUpload = types.compose(
  'FileUpload',
  id,
  types.model({
    meetingId: types.optional(MeetingBase, {}),
    uploaderId: types.optional(User, {}),
  }),
  name,
  path,
  GeneralModel,
)
  .actions(self => ({
    /**
     * @override
     */
    _getMainProperties(): Array<string> {
      return ['meetingId', 'uploaderId', 'name', 'path']
    },
    /**
     * @override
     */
    _getValidation(): Array<string> {
      const constraintOther = self.meetingId.id ? '' : 'Meeting is required'
      const constraintOther2 = self.uploaderId.id ? '' : 'Uploader is required!'
      return [
        self._getNameConstraint(),
        self._getPathConstraint(),
        constraintOther,
        constraintOther2
      ]
    },
    _getMainThreadOfSettingDatabaseNew: async function (snapshot: object) {
      // @ts-ignore
      snapshot.meetingId = snapshot.meetingId.id
      // @ts-ignore
      snapshot.uploaderId = snapshot.uploaderId.id
      const { errorMessage } = await API.setMeetingUploadFileNew(snapshot)
      if (errorMessage) throw new Error(errorMessage)
    },
    getFileUploaded: async function () {
      try {
        await firebase.storage().ref(self.path)
          .getDownloadURL()
          .then(url => {
            window.open(url, '_blank')
          })
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
      }
    },
    setFileUploadedDelete: async function () {
      try {
        await firebase.storage().ref(self.path).delete()
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
      }
    },
    setDatabaseDelete: async function (): Promise<ErrorMessage> {
      try {
        const { errorMessage } = await API.setMeetingFileUploadDelete(self.id)
        if (errorMessage) throw new Error(errorMessage)
        await this.setFileUploadedDelete()
        // @ts-ignore, to delete in browser
        getParent(self, 2).setFileUploadRemove(self.id)
        return ''
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
        return error.message
      }
    },
  }))

export const defaultOfMeetingFileUpload = MeetingFileUpload.create({})

const MeetingFileUploads = types.compose(
  'FileUpload',
  GeneralModelList,
  types.model({
    items: types.array(MeetingFileUpload)
  })
)

export const defaultOfMeetingFileUploads = MeetingFileUploads.create({})

export default MeetingFileUploads
