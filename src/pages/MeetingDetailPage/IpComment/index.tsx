import React from 'react'
import { observer } from 'mobx-react-lite'
import BtnUploadFile from './BtnUploadFile'

const IpMessage = () => {
  return (
    <div className="card-body border-top border-right">
      <div className="row">
        <div className="col-9">
          <div className="input-field mt-0 mb-0">
            <input id="textarea1" placeholder="Type and enter" className="form-control border-0" type="text" />
          </div>
        </div>
        <div className="col-3" style={{ padding: '0px' }}>
          <BtnUploadFile />
          <a className="btn-circle btn-lg btn-cyan float-right text-white ml-1 mr-2" href="#!"><i className="fas fa-paper-plane" /></a>
        </div>
      </div>
    </div>
  )
}

export default observer(IpMessage)
