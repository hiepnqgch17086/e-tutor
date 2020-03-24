import React from 'react';
import MainForm from './MainForm';
import { observer } from 'mobx-react-lite';
import headerPageClasses from '../../reusable-classes/headerPageClasses';

const SignInPage = (props: any) => {
  return (
    <div style={{
      maxWidth: 400,
      margin: 'auto'
    }} className="container">
      <h1 className={headerPageClasses}>Login</h1>
      <MainForm />
    </div>
  );
}

export default observer(SignInPage);
