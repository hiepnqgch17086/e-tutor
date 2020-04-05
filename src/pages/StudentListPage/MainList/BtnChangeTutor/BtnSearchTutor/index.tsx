// @typescript-eslint/no-unused-vars

import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import SearchBar from '../../../../../components-in-managing-resources/SearchBar';
import { Button } from 'reactstrap';
import Users from '../../../../../models-one-entity/Users';
import ListItemOfTutor from './ListItemOfTutor';

const BtnSearchTutor = () => {
  // eslint-disable-next-line
  const [tutorList, setTutorList] = useState(Users.create({}))
  const { emailContains } = tutorList

  useEffect(() => {
    if (emailContains) {
      tutorList.getDbTutorUsers()
    } else {
      tutorList.setSnapshotNew([], tutorList.items)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailContains])

  return (
    <li className="nav-item dropdown" style={{ listStyle: 'none' }}>
      <a href="#!" className="nav-link dropdown-toggle pl-md-3 position-relative d-flex flex-column" id="bell" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
        ref={node => {
          if (node) {
            node.style.setProperty("padding", "0px", "important")
          }
        }}
      >
        <Button>Search Tutor</Button>
      </a>




      {/* LIST OF MATCHED STUDENTS */}
      <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown p-0">
        <ul className="list-style-none">
          <li>
            <div className="message-center notifications position-relative">
              <SearchBar
                placeholder="tutor's email"
                className="mt-n3"
                setPropInput={tutorList.setEmailContains}
              />
              {/* Message */}
              {
                tutorList.items.map(item => (
                  <ListItemOfTutor key={item.id} item={item} />
                ))
              }
            </div>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default observer(BtnSearchTutor)
