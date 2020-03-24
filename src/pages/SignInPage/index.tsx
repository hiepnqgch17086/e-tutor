import React from 'react';
import MainForm from './MainForm';
import { observer } from 'mobx-react-lite';
import headerPageClasses from '../../reusable-classes/headerPageClasses';
import Data from './data'
import { Redirect } from 'react-router-dom';
import { HOME_PAGE } from '../../routes';

const SignInPage = (props: any) => {
  return (
    <div style={{
      maxWidth: 400,
      margin: 'auto'
    }} className="container">
      <h1 className={headerPageClasses}>Login</h1>
      <MainForm />
      {
        Data.shouldRedirectToHomepage && (
          <Redirect to={HOME_PAGE} />
        )
      }
    </div>
  );
}

export default observer(SignInPage);
