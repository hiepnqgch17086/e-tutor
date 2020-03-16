import { types, getType, getSnapshot } from "mobx-state-tree";
import setSnapshotNew from "../models-one-action/setSnapshotNew";
import { ErrorMessage, SetDatabaseNewProps } from "./types";
import createdAt from "../models-one-prop/createdAt";
import updatedAt from "../models-one-prop/updatedAt";
import _getProperties from "../models-one-action/_getProperties";
import setSnapshotUpdate from "../models-one-action/setSnapshotUpdate";
import { Response } from './types'
import API from "../api";

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
    _getReference(): string {
      console.log('\n')
      console.log('Name of model: ', getType(self).name)
      throw new Error(`Should override method _getReference() => .example: "/users"`)
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
        // constraint: getDB of only self
        // should set id before calling this method
        //@ts-ignore, reference to this._getReference()
        const ref = self._getReference()
        const snap = await ref.once('value')
        self.setSnapshotUpdate(snap.val()) // there can has addtional infor which will is existing in the screen, so using setSnapshotUpdate is better
        //@ts-ignore, reference to this._getDatabaseAdditionalInfo()
        const message = await self._getDatabaseAdditionalInfo()
        if (message) throw new Error(message)
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
    setDatabaseNew: async function ({
      url: propUrl = ''
    }: SetDatabaseNewProps = {}): Promise<Response> {
      try {
        // validate
        //@ts-ignore, reference to this._getOneConstraint()
        const message = self._getOneConstraint()
        if (message) throw new Error(message)

        // set date
        // self._setCreatedAtNow()
        // self._setUpdatedAtNow()

        // set id for new
        //@ts-ignore, reference to this._setCustomId()
        // self._setCustomId()

        // get key value in need,
        //@ts-ignore, reference to this._getMainProperties()
        const snapshot = self._getProperties([...self._getMainProperties()])
        if (typeof snapshot === 'string') throw new Error(snapshot)

        // @ts-ignore, reference to this._getReference()
        const url = propUrl || self._getReference()
        const res = await API.post(url, snapshot)
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

        // @ts-ignore, reference to this._getReference()
        const url = propUrl || self._getReference()
        const res = await API.put(url, snapshotUpdate)
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
