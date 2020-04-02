import React from 'react'
import { observer } from 'mobx-react-lite'
import SearchBar from '../../../../components-in-managing-resources/SearchBar';
import { Button } from 'reactstrap';
import AvatarInDefault from '../../../../images/AvatarInDefault';

const BtnSearchStudent = () => {
  return (
    <li className="nav-item dropdown" style={{ listStyle: 'none' }}>
      <a href="#!" className="nav-link dropdown-toggle pl-md-3 position-relative d-flex flex-column" id="bell" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
        ref={node => {
          if (node) {
            node.style.setProperty("padding", "0px", "important")
          }
        }}
      >
        <Button>Search Student</Button>
      </a>




      {/* LIST OF MATCHED STUDENTS */}
      <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown p-0">
        <ul className="list-style-none">
          <li>
            <div className="message-center notifications position-relative">
              <SearchBar
                placeholder="student's email"
                className="mt-n3"
              />
              {/* Message */}
              <a href="#!" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                <img src={AvatarInDefault} alt="user" className="rounded-circle" width={40} height={40} />
                <div className="w-75 d-inline-block v-middle pl-2">
                  <h6 className="message-title mb-0 mt-1">Name of tutor's student</h6>
                  <span className="font-12 text-nowrap d-block text-muted">
                  </span>
                  <span className="font-12 text-nowrap d-block text-muted"></span>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div>
    </li>
  )
}

export default observer(BtnSearchStudent)
