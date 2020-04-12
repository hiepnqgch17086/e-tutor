import React from 'react'
import { observer } from 'mobx-react-lite'
import FileUploads, { defaultOfFileUploads } from '../../../models-one-entity/FileUploads'
import moment from 'moment'
import FileUploadItem from './FileUploadItem'

const ListOfFileUpload = ({
  fileUploads = FileUploads.create({
    items: [
      {
        id: 1,
        cloudId: '1',
        createdAt: moment().calendar(),
        updatedAt: moment().calendar(),
        meetingId: { id: 1 },
        name: 'fileUpload-demo1',
        uploaderId: { id: 8 },
      },
      {
        id: 2,
        cloudId: '2',
        createdAt: moment().calendar(),
        updatedAt: moment().calendar(),
        meetingId: { id: 1 },
        name: 'fileUpload-demo2',
        uploaderId: { id: 8 },
      },
      {
        id: 3,
        cloudId: '3',
        createdAt: moment().calendar(),
        updatedAt: moment().calendar(),
        meetingId: { id: 1 },
        name: 'fileUpload-demo3',
        uploaderId: { id: 8 },
      }
    ]
  })
}) => {
  return (
    <div className="mt-1">
      {
        fileUploads.items.flatMap(item => (
          <FileUploadItem key={item.id} item={item} />
        ))
      }
    </div>
  )
}

export default observer(ListOfFileUpload)
