import React from 'react'
import { observer } from 'mobx-react-lite'

type Props = {
  numberOfStudents?: string | number,
  numberOfTutors?: string | number,
}

const CardListOfCounter = ({
  numberOfStudents = '',
  numberOfTutors = ''
}: Props) => {
  return (
    <div className="card-group">
      <div className="card border-right">
        <div className="card-body">
          <div className="d-flex d-lg-flex d-md-block align-items-center">
            <div>
              <div className="d-inline-flex align-items-center">
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfStudents}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Students</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-right">
        <div className="card-body">
          <div className="d-flex d-lg-flex d-md-block align-items-center">
            <div>
              <div className="d-inline-flex align-items-center">
                <h2 className="text-dark mb-1 font-weight-medium">{numberOfTutors}</h2>
              </div>
              <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Tutors</h6>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default observer(CardListOfCounter)
