import React, { useEffect } from 'react'
import AvatarInDefault from '../../../../../images/AvatarInDefault'
import { observer } from 'mobx-react-lite'
import { defaultOfUser } from '../../../../../models-one-entity/Users'
import { newTutor } from '../data'
import { getSnapshot } from 'mobx-state-tree'

const ListItemOfTutor = ({
  item = defaultOfUser
}) => {

  useEffect(() => {
    item.getDatabaseNumberOfStudentsOfTutor(item.id)
  }, [item, item.id])

  const onSelectTutor = () => {
    // console.log('developing')
    newTutor.setSnapshotNew(getSnapshot(item))
  }

  return (
    <a href="#!" className="message-item d-flex align-items-center border-bottom px-3 py-2" onClick={onSelectTutor}>
      <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
      <div className="w-75 d-inline-block v-middle pl-2">
        <h6 className="message-title mb-0 mt-1">{item.name}</h6>
        <span className="font-12 text-nowrap d-block text-muted">{item.email}</span>
        <span className="font-12 text-nowrap d-block text-muted">{item.numberOfStudentsOfTutor} students</span>
      </div>
    </a>
  )
}

export default observer(ListItemOfTutor)
