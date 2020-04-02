import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { SIGN_IN_PAGE, getIsAuthorized, HOME_PAGE, LANDING_PAGE, ADMIN_ERROR_PAGE, PROFILE_PAGE, CHAT_PAGE, MEETING_LIST_PAGE, MEETING_DETAIL_PAGE } from './routes'
import SignInPage from './pages/SignInPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import './firebaseConfig'
import AdminLayout from './layout/AdminLayout';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import MeetingListPage from './pages/MeetingListPage';
import MeetingDetailPage from './pages/MeetingDetailPage';
// import CalenderPage from './pages/CalenderPage';
// import Axios from 'axios';

const pathAvoid = [SIGN_IN_PAGE, LANDING_PAGE, ADMIN_ERROR_PAGE]

function App() {
  return (
    <BrowserRouter>
      <Route exact path={SIGN_IN_PAGE} component={SignInPage} />
      <Route exact path={LANDING_PAGE} component={LandingPage} />

      <AdminLayout pathAvoid={pathAvoid}>
        <Switch>
          <PrivateRoute exact path={HOME_PAGE}>
            <HomePage />
          </PrivateRoute>
          <PrivateRoute exact path={PROFILE_PAGE}>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute exact path={CHAT_PAGE}>
            <ChatPage />
          </PrivateRoute>
          <PrivateRoute exact path={MEETING_LIST_PAGE}>
            <MeetingListPage />
          </PrivateRoute>
          <PrivateRoute path={MEETING_DETAIL_PAGE}>
            <MeetingDetailPage />
          </PrivateRoute>
        </Switch>
      </AdminLayout>

      <ToastContainer />
    </BrowserRouter>
  );
}

const PrivateRoute = ({ children = <></>, ...rest }) => {
  return <Route {...rest}>
    {getIsAuthorized() ? children : <Redirect to={SIGN_IN_PAGE} />}
  </Route>
}

export default App;

// const data = {
//   "email": "admin3@example.com",
//   "password": "1234567",
//   "name": "admin3"
// }

// Axios.post('http://localhost:4000/login', data)
//   .then(res => {
//     console.log('data', res.data)
//   })
//   .catch(err => console.log(err))
