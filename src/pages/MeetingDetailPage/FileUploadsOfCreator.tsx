import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser } from '../../models-one-entity/Users'
import ProfilePageData from '../ProfilePage/data'
import AvatarInDefault from '../../images/AvatarInDefault'
import FileUploadOfMeetingInFirebase from '../../components/FileUpload/FileUploadOfMeetingInFirebase'
import ListOfFileUpload from './ListOfFileUpload'
import Data from './data'

const FileUploadsOfCreator = ({
  creator = defaultOfUser
}) => {
  const { currentUser } = ProfilePageData
  const { meeting } = Data
  return (
    <div>
      <div className="message-item py-2 d-flex align-items-center">
        <div>
          <img src={creator.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
        </div>
        <div className="d-inline-block v-middle pl-2">
          <h6 className="message-title mb-0 mt-1">
            {creator.name}
          </h6>
          <span className="font-12 text-nowrap d-block text-muted" >
            <i className="far fa-envelope mr-1" title={creator.email} />
            {currentUser.id === creator.id ? 'You' : 'Student'}
          </span>
        </div>
      </div>

      <ListOfFileUpload
        isAuth={currentUser.id === creator.id}
        meeting={meeting}
      />
      <div className="mt-1">
        {currentUser.id && currentUser.id === creator.id ? (
          <FileUploadOfMeetingInFirebase
            meeting={meeting}
          />
        ) : null}
      </div>
    </div>
  )
}

export default observer(FileUploadsOfCreator)
