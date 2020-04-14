import React from 'react'
import { observer } from 'mobx-react-lite'
import { newTutor, shouldForceChange } from './data'
import { DANGEROUS } from '../../../../models-one-entity/Users'

const CheckBoxForceChange = () => {
  if (newTutor && newTutor.statusOfSupportingStudents === DANGEROUS) {
    return (
      <div className="custom-control custom-checkbox">
        <input type="checkbox" className="custom-control-input" id="customCheck1" checked={shouldForceChange.shouldForceChange}
          onClick={shouldForceChange.setToggle}
        />
        <label className="custom-control-label" htmlFor="customCheck1">
          Force change?
        </label>
      </div>
    )
  }

  return <div></div>

}

export default observer(CheckBoxForceChange)
