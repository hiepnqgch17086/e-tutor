
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import SearchBar from '../../AllUsersPage/SearchBar';
import SlNumberOfItems from '../../AllUsersPage/SlNumberOfItems';
import PaginationBar from '../../AllUsersPage/PaginationBar';
import './BtnAddStudent.css'

const BtnAddStudent = (props: any) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>Add</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} style={{ maxWidth: '900px' }}>
        <ModalHeader toggle={toggle}>
          <SearchBar
            placeholder={"Enter student's email"}
          />
        </ModalHeader>
        <ModalBody>


          <SlNumberOfItems />
          <div className="card">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Menu</th>
                    <th>Avatar</th>
                    <th>Email</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <th scope="row">{1}</th>
                    <th>
                      <Button>
                        +
                      </Button>
                    </th>
                    <th>
                      <img src={'https://firebasestorage.googleapis.com/v0/b/e-totur.appspot.com/o/avatars%2Fu1?alt=media&token=49bdae7d-eac3-4fed-8c05-7ae0494bb223'} alt="user" className="rounded-circle" width={70} height={70} />
                    </th>
                    <th>{'quanghiep294@gmail.com'}</th>
                    <th>{'ADMIN INEOS ASD'}</th>

                  </tr>

                  {/* 
      {
        users.items.map((user, index) => (
          <UserItemObserver
            item={user}
            index={index}
            key={user.id}
          />
        ))
      } */}

                </tbody>


              </table>
            </div>

          </div>

          <PaginationBar />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default BtnAddStudent
