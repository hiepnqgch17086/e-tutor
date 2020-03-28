import { types, getType, getSnapshot } from "mobx-state-tree";
import setSnapshotNew from "../models-one-action/setSnapshotNew";
import { ErrorMessage } from "./types";
import createdAt from "../models-one-prop/createdAt";
import updatedAt from "../models-one-prop/updatedAt";
import _getProperties from "../models-one-action/_getProperties";
import setSnapshotUpdate from "../models-one-action/setSnapshotUpdate";
import { Response } from './types'
import { AxiosResponse } from "axios";

const defaultSnapshot = {}

const GeneralModel = types.compose(
  createdAt, updatedAt,
  setSnapshotNew, _getProperties, setSnapshotUpdate,
)
  .actions(self => ({
    _getDatabaseDeleteConstraint(): void | Promise<ErrorMessage> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      console.log('Can override method _getDatabaseDeleteConstraint() => Promise<ErrorMessage>, for preventing when delete data')
      return
    },
    _getDatabaseAdditionalInfo(): void | Promise<ErrorMessage> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      console.log(`can override method _getDatabaseAdditionalInfo() => Promise<ErrorMessage>, for get more database, for example: product needs category title, but in firebase realtime, can not join, so need to getDatabase of product's category`)
      return
    },
    _getMainProperties(): Array<string> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      throw new Error(`Should override method _getMainProperties() => array list of main properties will be stored in database. example: ['id', 'title']`)
    },
    _getOneConstraint(): ErrorMessage {
      //@ts-ignore, reference to this._getValidation()
      const validation = self._getValidation()
      for (const constraint of validation) {
        if (constraint) return constraint
      }
      return ''
    },
    // should override
    _getValidation(): Array<string> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      throw new Error(`Should override method _getValidation() => array of constraint string, ['title-constraint', 'code-constraint']`)
    },
    // should override
    _getMainThreadOfGettingDatabase(): Promise<AxiosResponse<any>> | Promise<any> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      throw new Error(`Should override method _getMainThreadOfGettingDatabase()`)
    },
    // should override
    _getMainThreadOfSettingDatabaseUpdate(): Promise<AxiosResponse<any>> | Promise<any> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      throw new Error(`Should override method _getMainThreadOfSettingDatabaseUpdate()`)
    },
    _getMainThreadOfSettingDatabaseNew(snapshot: Object): Promise<AxiosResponse<any>> | Promise<any> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      throw new Error(`Should override method _getMainThreadOfSettingDatabaseNew()`)
    },
    _getMainThreadOfSettingDatabaseDelete(): Promise<AxiosResponse<any>> | Promise<any> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      throw new Error(`Should override method _getMainThreadOfSettingDatabaseDelete()`)
    },
    // should override
    _setCustomId() {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      throw new Error(`Should override method _setCustomId(), to setup id based on the firebase ref, example: self.setId(firebase.database().ref().child('colors').push().key)`)
    },
    // when delete template, can delete template color, template sizes
    _setDatabaseDeleteRelated(): void | Promise<ErrorMessage> {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      console.log(`can override method _setDatabaseDeleteRelated() => Promise<Response>`)
      return
    },
    /**
     * to get database of item, should setId before use this method
     */
    getDatabase: async function (): Promise<Response> {
      try {
        // @ts-ignore
        const res = await self._getMainThreadOfGettingDatabase()
        self.setSnapshotUpdate(res.data)
        return {
          isSuccess: true,
          // @ts-ignore
          data: getSnapshot(self)
        }
      } catch (error) {
        console.log('getDatabase()', error.message)
        return {
          isSuccess: false,
          errorMessage: error.message
        }
      }
    },
    /**
     * to set database with new, set promise for validating in server if has
     */
    setDatabaseNew: async function (): Promise<Response> {
      try {
        // validate
        //@ts-ignore, reference to this._getOneConstraint()
        const message = self._getOneConstraint()
        if (message) throw new Error(message)

        //@ts-ignore, reference to this._getMainProperties()
        const snapshot = self._getProperties([...self._getMainProperties()])
        if (typeof snapshot === 'string') throw new Error(snapshot)

        //@ts-ignore, reference to this._getMainThreadOfSettingDatabaseNew()
        const res = await self._getMainThreadOfSettingDatabaseNew(snapshot)
        const data = res.data

        return {
          isSuccess: true,
          data
        }
      } catch ({ message }) {
        console.log('setDatabaseNew()', message)
        return {
          isSuccess: false,
          errorMessage: message,
        }
      }
    },
    /**
     * to update database item, set promise for validating in server if has
     */
    setDatabaseUpdate: async function (snapshot: object = defaultSnapshot): Promise<Response> {
      /**
       * if snapshot, update with snapshot, else update with self
       */
      try {
        let propertiesUpdated: any
        if (snapshot !== defaultSnapshot) {
          const errorMessage = self.setSnapshotUpdate(snapshot)
          if (errorMessage) throw new Error(errorMessage)
          propertiesUpdated = Object.keys(snapshot)
        }
        // validate
        const message = this._getOneConstraint()
        if (message) throw new Error(message)

        // set date
        self._setUpdatedAtNow()

        // get key value in need,
        //@ts-ignore, reference to this._getMainProperties()
        const updatedProps = propertiesUpdated ? [...propertiesUpdated, 'updatedAt'] : [...self._getMainProperties(), 'updatedAt']
        const snapshotUpdate = self._getProperties(updatedProps)
        if (typeof snapshotUpdate === 'string') throw new Error(snapshotUpdate)

        const res = await this._getMainThreadOfSettingDatabaseUpdate()
        const data = res.data
        return {
          isSuccess: true,
          data
        }
      } catch ({ message }) {
        console.log('setDatabaseUpdate():', message)
        return {
          isSuccess: false,
          errorMessage: message
        }
      }
    },
    /**
     * to detele database item, should set await for this
     */
    setDatabaseDelete: async function (): Promise<Response> {
      try {
        // @ts-ignore, reference to this._getDatabaseDeleteConstraint()
        const errorMessage = await self._getDatabaseDeleteConstraint()
        if (errorMessage) throw new Error(errorMessage)

        // RELATED data
        // @ts-ignore, reference to this._setDatabaseDeleteRelated()
        const errorMessage2 = await self._setDatabaseDeleteRelated()
        if (errorMessage2) throw new Error(errorMessage2)

        // MAIN data
        // @ts-ignore, reference to this._getReference()
        self._getReference().remove()
        return {
          isSuccess: true,
          // @ts-ignore
          data: getSnapshot(self)
        }
      } catch ({ message }) {
        console.log('setDatabaseDelete():', message)
        return {
          isSuccess: false,
          errorMessage: message
        }
      }
    }
  }))

export default GeneralModel
