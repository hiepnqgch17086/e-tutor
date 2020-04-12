import { types } from "mobx-state-tree";
import id, { cloudId } from "../models-one-prop/id";
import GeneralModel from "./GeneralModel";
import GeneralModelList from "./GeneralModelList";
import { MeetingBase } from "./BaseModels";
import name from "../models-one-prop/name";
import { User } from "./Users";

export const FileUpload = types.compose(
  'FileUpload',
  id,
  types.model({
    meetingId: types.optional(MeetingBase, {}),
    uploaderId: types.optional(User, {}),
  }),
  name,
  cloudId,
  GeneralModel,
)

export const defaultOfFileUpload = FileUpload.create({})

const FileUploads = types.compose(
  'FileUpload',
  GeneralModelList,
  types.model({
    items: types.array(FileUpload)
  })
)

export const defaultOfFileUploads = FileUploads.create({})

export default FileUploads
