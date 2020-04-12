import React from 'react'
import { observer } from 'mobx-react-lite'
import FileUploadItem from './FileUploadItem'
import { defaultOfMeeting } from '../../../models-one-entity/Meetings'
import ProfilePageData from '../../ProfilePage/data'

const ListOfFileUpload = ({
  meeting = defaultOfMeeting
}) => {
  return (
    <div className="mt-1">
      {
        meeting.fileUploads.filter(item => item.uploaderId.id === ProfilePageData.currentUser.id).flatMap(item => (
          <FileUploadItem key={item.id} item={item} />
        ))
      }
    </div>
  )
}

export default observer(ListOfFileUpload)
