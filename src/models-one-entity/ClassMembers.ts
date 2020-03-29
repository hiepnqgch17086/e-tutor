import { types } from "mobx-state-tree";
import id, { userId, classId } from "../models-one-prop/id";
import GeneralModel from "./GeneralModel";
import GeneralModelList from "./GeneralModelList";
import API from "../api";

export const ClassMember = types.compose(
  'ClassMember',
  id, userId, classId,
  GeneralModel,
  // additional 
  // userName, userAvatar,
)
  .actions(self => ({
    /**
     * @override
     */
    _getMainThreadOfSettingDatabaseNew(snapshot: Object) {
      return API.setClassMemberNew(snapshot)
    },
    // /**
    //  * @override
    //  */
    // _getMainProperties(): Array<string> {
    //   return ['userId', 'classId']
    // },
    // /**
    //  * @override
    //  */
    // _getReference(): string {
    //   // if new, consider like /users/
    //   return `/classes/${self.id}`
    // },
    // /**
    //  * @override
    //  */
    // _getValidation(): Array<string> {
    //   return [
    //     self._getTitleConstraint(),
    //     self._getDescriptionConstraint(),
    //     self._getTutorIdConstraint(),
    //     self._getStartAtConstraint(),
    //     self._getEndAtConstraint()
    //   ]
    // },
  }))

const ClassMembers = types.compose(
  'ClassMembers',
  GeneralModelList,
  types.model({
    items: types.array(ClassMember)
  })
)

export const defaultOfClassMembers = ClassMembers.create({})
export const defaultOfClassMember = ClassMember.create({})

export default ClassMembers
