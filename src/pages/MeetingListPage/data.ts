import { types } from "mobx-state-tree";
import GeneralPageModel from "../GeneralPageModel";
import { Meeting } from "../../models-one-entity/Meetings";

const MeetingListPageData = types.compose(
  'MeetingListPageData',
  GeneralPageModel,
  types.model({
    newMeeting: types.optional(Meeting, {})
  })
)
  .on
