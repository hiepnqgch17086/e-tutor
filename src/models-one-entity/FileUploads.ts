import { types } from "mobx-state-tree";
import id, { cloudId } from "../models-one-prop/id";
import GeneralModel from "./GeneralModel";

export const FileUpload = types.compose(
  'FileUpload',
  id,
  cloudId,
  GeneralModel,
)

export const defaultOfFileUpload = FileUpload.create({})
