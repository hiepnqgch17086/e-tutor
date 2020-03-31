import React from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'
import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'

const MainForm = () => {

  const history = useHistory()

  const onSignInSuccess = () => {
    history.push(HOME_PAGE)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    Data.onSignIn(onSignInSuccess)
  }

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
            onClick={onSubmit}
          >Sign In</button>
        </div>
        <div className="col-lg-12 text-center mt-5">
        </div>
      </div>
    </form>
  )
}

export default observer(MainForm)
