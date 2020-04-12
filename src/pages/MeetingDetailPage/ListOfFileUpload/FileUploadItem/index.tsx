import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfMeetingFileUpload } from '../../../../models-one-entity/MeetingFileUploads'
import './index.css'
import { Spinner } from 'reactstrap'
import IconDelete from './IconDelete'
import ProfilePageData from '../../../ProfilePage/data'

const FileUploadItem = ({
  item = defaultOfMeetingFileUpload
}) => {
  const { currentUser } = ProfilePageData

  const [isCallingApi, setIsCallingApi] = useState(false)

  const onDownload = async () => {
    setIsCallingApi(true)
    await item.getFileUploaded()
    setIsCallingApi(false)
  }

  const isAuth = currentUser.id && currentUser.id === item.uploaderId.id
    ? true
    : false

  return (
    <div className="d-flex justify-content-between border-bottom">
      <div>
        {
          isCallingApi && (
            <Spinner color="primary" size="sm" className="mr-1" />
          )
        }
        {item.name}
      </div>
      <div>
        <i className="icon-cloud-download cursor-pointer x-item" onClick={onDownload} />
        {
          isAuth && (
            <IconDelete
              meetingFileUpload={item}
              setIsCallingApi={setIsCallingApi}
            />
          )
        }
      </div>
    </div>
  )
}

export default observer(FileUploadItem)
