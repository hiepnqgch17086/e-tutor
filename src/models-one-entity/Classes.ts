import { types } from "mobx-state-tree";
import id, { creatorId, tutorId } from "../models-one-prop/id";
import title from "../models-one-prop/title";
import description from "../models-one-prop/description";
import GeneralModel from "./GeneralModel";
import GeneralModelList from "./GeneralModelList";
import API from "../api";
import PaginationModel from "./PaginationModel";
import { toast } from "react-toastify";

export const Class = types.compose(
  'Class',
  id, title, description, tutorId,
  GeneralModel,
)
  .actions(self => ({
    /**
     * @override
     */
    _getMainThreadOfSettingDatabaseNew(snapshot: Object) {
      return API.setClassNew(snapshot)
    },
    /**
     * @override
     */
    _getMainProperties(): Array<string> {
      return ['title', 'description', 'tutorId']
    },
    /**
     * @override
     */
    _getReference(): string {
      // if new, consider like /users/
      return `/classes/${self.id}`
    },
    /**
     * @override
     */
    _getValidation(): Array<string> {
      return [
        self._getTitleConstraint(),
        self._getDescriptionConstraint(),
        self._getTutorIdConstraint(),
      ]
    },
  }))

const Classes = types.compose(
  'Classes',
  GeneralModelList,
  types.model({
    items: types.array(Class)
  })
)
  .actions(self => ({
    getDatabaseItemsForAdmin: async function () {
      try {
        const { data } = await API.getClassesForAdmin({
          limit: self.limit,
          page: self.page,
          title: self.searchByTitle
        })
      } catch (error) {
        console.log(error.message)
        toast.error('Something went wrong!')
      }
    }
  }))

export const defaultOfClasses = Classes.create({})
export const defaultOfClass = Class.create({})

export default Classes

