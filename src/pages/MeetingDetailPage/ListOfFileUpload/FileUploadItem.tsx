import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfFileUpload } from '../../../models-one-entity/FileUploads'
import './FileUploadItem.css'

const FileUploadItem = ({
  item = defaultOfFileUpload
}) => {
  return (
    <div className="d-flex justify-content-between border-bottom">
      <div>{item.name}</div>
      <div>
        <i className="icon-cloud-download cursor-pointer x-item" />
        <i className="icon-trash cursor-pointer ml-1 x-item" />
      </div>
    </div>
  )
}

export default observer(FileUploadItem)
