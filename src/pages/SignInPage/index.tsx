import React from 'react';
import MainForm from './MainForm';
import { observer } from 'mobx-react-lite';

const SignInPage = (props: any) => {
  return (
    <div style={{
      maxWidth: 400,
      margin: 'auto'
    }} className="container mt-5">
      <h1>Login</h1>
      <MainForm />
    </div>
  );
}

export default observer(SignInPage);
