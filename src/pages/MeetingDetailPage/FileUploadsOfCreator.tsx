import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser } from '../../models-one-entity/Users'
import ProfilePageData from '../ProfilePage/data'
import AvatarInDefault from '../../images/AvatarInDefault'
import FileUploadFirebase from '../../components/FileUpload/FileUploadFirebase'
import ListOfFileUpload from './ListOfFileUpload'

const FileUploadsOfCreator = ({
  creator = defaultOfUser
}) => {
  const { currentUser } = ProfilePageData
  return (
    <div>
      <div className="message-item px-3 py-2 d-flex align-items-center">
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
      {currentUser.id === creator.id && (
        <FileUploadFirebase />
      )}
      <ListOfFileUpload />
    </div>
  )
}

export default observer(FileUploadsOfCreator)
