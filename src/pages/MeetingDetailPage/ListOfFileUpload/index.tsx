import React from 'react'
import { observer } from 'mobx-react-lite'
import FileUploadItem from './FileUploadItem'
import { defaultOfMeeting } from '../../../models-one-entity/Meetings'
import ProfilePageData from '../../ProfilePage/data'
// import { getSnapshot } from 'mobx-state-tree'

const ListOfFileUpload = ({
  meeting = defaultOfMeeting,
  isAuth = false
}) => {
  const listRender = isAuth
    ? meeting.fileUploads.filter(item => item.uploaderId.id === ProfilePageData.currentUser.id)
    : meeting.fileUploads.filter(item => item.uploaderId.id !== ProfilePageData.currentUser.id)
  // console.log(getSnapshot(meeting.fileUploads))
  return (
    <div className="mt-1">
      {
        listRender.flatMap(item => (
          <FileUploadItem key={item.id} item={item} />
        ))
      }
    </div>
  )
}

export default observer(ListOfFileUpload)
