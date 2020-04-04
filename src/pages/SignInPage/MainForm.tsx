import React from 'react'
import { observer } from 'mobx-react-lite'
import Data from './data'
// import { useHistory } from 'react-router-dom'
import { HOME_PAGE } from '../../routes'
import ProfilePageData from '../ProfilePage/data'
import CustomInput from '../../components-in-managing-resources/CustomInput'

const { currentUser } = ProfilePageData

const MainForm = () => {

  // const history = useHistory()

  const onSignInSuccess = () => {
    window.location.href = HOME_PAGE
    // history.push(HOME_PAGE)
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
            <CustomInput
              value={currentUser.email}
              onChangeText={currentUser.setEmail}
              placeholder="enter your email"
              type="email"
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group">
            <label className="text-dark" htmlFor="pwd">Password *</label>
            <CustomInput
              value={currentUser.password}
              onChangeText={currentUser.setPassword}
              placeholder="enter your password"
              type="password"
            />
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
