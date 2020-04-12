import React, { useState } from 'react'
import firebase from 'firebase'
import { Spinner } from 'reactstrap'
import CustomInput from '../../components-in-managing-resources/CustomInput'
import { MeetingFileUpload } from '../../models-one-entity/MeetingFileUploads'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'
import { defaultOfMeeting } from '../../models-one-entity/Meetings'
import ProfilePageData from '../../pages/ProfilePage/data'

const FileUploadOfMeetingInFirebase = ({
  firebaseDirectory = 'uploads',
  meeting = defaultOfMeeting
}) => {
  const { currentUser } = ProfilePageData
  const inputFileId = currentUser.id && meeting.id ? `${currentUser.id}-${meeting.id}` : ""
  // const inputEl = useRef(null)

  const [fileUpload, setFileUpload] = useState(MeetingFileUpload.create({}))

  const [file, setFile] = useState(null)
  /** status presents system is uploading file or not */
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  /** set for file which will be uploaded */
  const [fileExtension, setFileExtension] = useState('') // combine with fileKey to create path in firebase

  const onDrop = (file: any) => {
    setFileExtension(file.name.split('.').pop())
    setFile(file)
  }

  const onSaveFile = async () => {
    // validate file upload name
    const nameConstraint = fileUpload._getNameConstraint()
    if (nameConstraint) return toast.error(nameConstraint)

    // to create path: firebaseDirectory + fileKey.fileExtension
    const fileKey = firebase.database().ref(firebaseDirectory).push().key
    if (!fileKey) return
    // console.log('fileKey', fileKey, fileExtension)
    const pathOfFirebaseStorage = `${firebaseDirectory}/${fileUpload.name}_${fileKey}.${fileExtension}`

    const onUploadSuccess = async () => {
      fileUpload.setPath(pathOfFirebaseStorage)
      // set meeting
      fileUpload.meetingId.setId(meeting.id)
      fileUpload.uploaderId.setId(currentUser.id)
      // console.log(fileUpload.meetingId)
      await fileUpload.setDatabaseNew()

      onResetFile()
    }

    const onUploadError = (error: any) => {
      console.log(error.message)
      toast.error('Something went wrong!')
      setIsUploadingFile(false)
    }

    // firebase.storage().ref(`avatars/${user.id}`)
    //   .getDownloadURL()
    //   .then(url => {
    //     // console.log(url)
    //     user.setAvatar(url)
    //     setIsUploadingImage(false)
    //     onSaveForm()
    //   })

    if (file) {
      setIsUploadingFile(true)
      firebase.storage()
        .ref(pathOfFirebaseStorage)
        // @ts-ignore
        .put(file)
        .on('state_changed',
          () => { },
          (error: any) => onUploadError(error),
          () => onUploadSuccess()
        )
    }
  }

  const onResetFile = () => {
    // reset field
    setFile(null)
    setFileExtension('')
    setIsUploadingFile(false)
    setFileUpload(MeetingFileUpload.create({}))
    // reset file input
    // @ts-ignore
    if (inputFileId) document.getElementById(inputFileId).value = null
  }

  return (
    <div>

      <input disabled={isUploadingFile}
        type="file" name="" id={inputFileId}
        onChange={(e) => {
          if (e.target.files?.length) {
            onDrop(e.target.files[0])
          }
        }}
      />
      {
        file ? (
          <div>
            <div className="mt-1">
              <CustomInput
                disabled={isUploadingFile}
                value={fileUpload.name}
                onChangeText={fileUpload.setName}
                placeholder="file's name"
                onPressEnter={onSaveFile}
              />
            </div>

            <div className="btn-group mt-1 mb-1">
              <button className="btn btn-light btn-sm" onClick={onSaveFile} disabled={isUploadingFile}>
                Save
              </button>
              <button className="btn btn-light btn-sm ml-1"
                disabled={isUploadingFile}
                onClick={onResetFile}
              >
                Close
              </button>
            </div>
            {
              isUploadingFile && (
                <Spinner color="primary" size="sm" />
              )
            }
          </div>
        ) : null
      }
    </div>
  )
}

export default observer(FileUploadOfMeetingInFirebase)
