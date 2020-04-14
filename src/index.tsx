import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ProfilePageData from './pages/ProfilePage/data';
import { IS_ADMIN } from './models-one-prop/role';
import SettingsData from './pages/SettingsPage/data';
// import 'bootstrap/dist/css/bootstrap.min.css';

const loadBaseData = async () => {
  await ProfilePageData.currentUser.getMyProfile()
  if (ProfilePageData.currentUser.role === IS_ADMIN) {
    SettingsData.getDatabaseNumberOfStudentsPerTutor()
  }
}

loadBaseData()

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
