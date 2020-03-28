import React from 'react'
import { observer } from 'mobx-react-lite'
import { defaultOfUser } from '../../models-one-entity/Users'
import AvatarInDefault from '../../images/AvatarInDefault'
import { Button } from 'reactstrap'
import { goUserPage } from '../../routes'

const CardOfTutorInfo = ({
  user = defaultOfUser
}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <img width="200px" height="200px" src={user.avatar || AvatarInDefault} alt="Card cap" />
      <h4 className="mt-2 text-dark">{user.name}</h4>
      <h6>
        {user.email}
        {
          user.email ? (
            <Button size="sm" className="ml-1" onClick={() => goUserPage(user.id)}>
              Detail
            </Button>

          ) : null
        }
      </h6>
    </div>
  )
}

export default observer(CardOfTutorInfo)
