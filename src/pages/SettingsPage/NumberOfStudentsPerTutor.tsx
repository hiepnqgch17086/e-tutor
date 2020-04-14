import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, ButtonGroup } from 'reactstrap'
import CustomInput from '../../components-in-managing-resources/CustomInput'
import Data from './data'

type Props = {
  info: number | string
}

const NumberOfStudentsPerTutor = ({
  info,
}: Props) => {

  const [cloneInfo, setCloneInfo] = useState(info)
  const [editable, setEditable] = useState(false)

  const toggle = () => setEditable(!editable)

  const onSave = async () => {
    const errorMessage = await Data.setDatabaseNumberOfStudentsPerTutorUpdate(cloneInfo)
    if (!errorMessage) {
      toggle()
    }
  }

  useEffect(() => {
    if (info !== cloneInfo) {
      setCloneInfo(info)
    }
    // eslint-disable-next-line
  }, [info, editable])

  return (
    <>
      <div className="card-title d-flex align-items-center">
        <div>
          Number of students / tutor: {info}
        </div>
        <Button size="sm" color="success" className="ml-2" onClick={toggle}>
          <i className="icon-note" />
        </Button>
      </div>
      {
        editable && (
          <div className="d-flex">
            <CustomInput
              value={cloneInfo}
              onChangeText={(numberString: any) => {
                setCloneInfo(parseInt(numberString) || '')
              }}
              onPressEnter={onSave}
              type={`number`}
            />
            <ButtonGroup size="sm">
              <Button color="primary" onClick={onSave}>Save</Button>
              <Button className="ml-1" onClick={toggle}>Cancel</Button>
            </ButtonGroup>
          </div>
        )
      }
    </>
  )
}

export default observer(NumberOfStudentsPerTutor)
