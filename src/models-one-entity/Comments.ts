import { types } from "mobx-state-tree";
import id from "../models-one-prop/id";
import text from "../models-one-prop/text";
import GeneralModel from "./GeneralModel";
import { User } from "./Users";
import { MeetingBase } from './BaseModels'
import API from "../api";

export const Comment = types.compose(
  'Comment',
  GeneralModel,
  id,
  types.model({
    userId: types.optional(User, {}),
    meetingId: types.optional(MeetingBase, {}),
  }),
  text,
)
  .actions(self => ({
    /**
     * @override
     */
    _getMainProperties(): Array<string> {
      return ['text', 'meetingId', 'fileUploads']
    },
    /**
     * @override
     */
    _getValidation(): Array<string> {
      const constraninMeeting = !self.meetingId.id
        ? 'Meeting is required'
        : ''
      return [
        self._getTextConstraint(),
        constraninMeeting
      ]
    },
    _getMainThreadOfSettingDatabaseNew: async function (snapshot: object) {
      try {
        const { errorMessage } = await API.setCommentNew(snapshot)
        if (errorMessage) throw new Error(errorMessage)
        // created success
        self.setSnapshotNew({})
      } catch (error) {
        console.log(error.message)
      }
    },
  }))

export const defaultOfComment = Comment.create({})
