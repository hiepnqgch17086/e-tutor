import React, { useEffect } from 'react';
import MainForm from './MainForm';
import { observer } from 'mobx-react-lite';
import Data from './data'
import { Redirect } from 'react-router-dom';
import { HOME_PAGE } from '../../routes';

const SignInPage = (props: any) => {
  useEffect(() => {
    // effect
    return () => {
      // cleanup
      Data.onWillUnMount()
    }
  }, [])
  return (
    <>
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative" style={{ background: 'url(assets/images/big/auth-bg.jpg) no-repeat center center' }}>
        <div className="auth-box row">
          <div className="col-lg-7 col-md-5 modal-bg-img" style={{ backgroundImage: 'url(assets/images/big/3.jpg)' }}>
          </div>
          <div className="col-lg-5 col-md-7 bg-white">
            <div className="p-3">
              <div className="text-center">
                <img src="assets/images/big/icon.png" alt="wrapkit" />
              </div>
              <h2 className="mt-3 text-center">eTutur</h2>
              <p className="text-center">Enter your email address and password to access admin panel.</p>
              <MainForm />
            </div>
          </div>
        </div>
      </div>

      {/* <h1 className="mt-5 text-dark">Login</h1>
      <MainForm /> */}
      {
        Data.shouldRedirectToHomepage && (
          <Redirect to={HOME_PAGE} />
        )
      }
    </>
  );
}

export default observer(SignInPage);
