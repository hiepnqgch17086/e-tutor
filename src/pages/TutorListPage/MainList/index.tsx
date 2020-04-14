import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser, defaultOfUsers, NORMAL, WARNING, DANGEROUS } from '../../../models-one-entity/Users'
import { goTutorPage } from '../../../routes'
import CustomTable from '../../../components-in-managing-resources/CustomTable'
import { Button, ButtonGroup } from 'reactstrap'
import AvatarInDefault from '../../../images/AvatarInDefault'
import { IS_STUDENT, IS_TUTOR } from '../../../models-one-prop/role'
import SettingsData from '../../SettingsPage/data'

const MainList = ({
  users = defaultOfUsers
}) => {
  const { page, limit } = users
  // console.log(users)
  return (
    <CustomTable
      className="mb-2"
      headerArray={["#", "Avatar", "Name", "Email", "Role", "Students", "Menu"]}
      data={users.items}
      renderItemCellsInRow={({ item = defaultOfUser, index = 0 }) => {
        return [
          (page - 1) * limit + index + 1,
          <img src={item.avatar || AvatarInDefault} alt="user" className="rounded-circle" width={70} height={70} />,
          item.name,
          item.email,
          item.role === IS_STUDENT ? 'Student' : item.role === IS_TUTOR ? 'Tutor' : 'Other',
          <CellNumberOfStudentsObserver tutor={item} />,
          <ButtonGroup>
            <Button onClick={() => goTutorPage(item.id)} size="sm">
              Detail
            </Button>
          </ButtonGroup>
        ]
      }}
    />
  )
}

const CellNumberOfStudents = ({ tutor = defaultOfUser }) => {
  useEffect(() => {
    tutor.getDatabaseNumberOfStudentsOfTutor(tutor.id)
  }, [tutor, tutor.id])

  let classNameCustom = ''
  switch (tutor.statusOfSupportingStudents) {
    case NORMAL:
      classNameCustom = ''
      break;
    case WARNING:
      classNameCustom = 'bg-warning text-white'
      break;
    case DANGEROUS:
      classNameCustom = 'bg-danger text-white'
      break;
    default:
      break;
  }

  return <>
    {
      tutor.numberOfStudentsOfTutor !== "" ? (
        <span className={`p-1 ${classNameCustom}`}>
          {tutor.numberOfStudentsOfTutor} student(s)
        </span>
      ) : null
    }
  </>
}

const CellNumberOfStudentsObserver = observer(CellNumberOfStudents)

export default observer(MainList)
