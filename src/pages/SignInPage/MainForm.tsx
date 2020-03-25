import React from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'

const MainForm = () => {

  return (
    <form className="mt-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label className="text-dark" htmlFor="uname">Email *</label>
            <input className="form-control" id="uname" type="email" placeholder="enter your email" />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <label className="text-dark" htmlFor="pwd">Password *</label>
            <input className="form-control" id="pwd" type="password" placeholder="enter your password" />
          </div>
        </div>
        <div className="col-lg-12 text-center">
          <button className="btn btn-block btn-dark"
            onClick={(e) => {
              e.preventDefault()
              Data.onSignIn()
            }}
          >Sign In</button>
        </div>
        <div className="col-lg-12 text-center mt-5">
          {/* Don't have an account? <a href="#" className="text-danger">Sign Up</a> */}
        </div>
      </div>
    </form>
  )
}

export default observer(MainForm)
