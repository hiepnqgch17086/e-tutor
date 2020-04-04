import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { SIGN_IN_PAGE, getIsAuthorized, HOME_PAGE, LANDING_PAGE, ADMIN_ERROR_PAGE, PROFILE_PAGE, CHAT_ROOM_TUTOR_PAGE, MEETING_LIST_PAGE, MEETING_DETAIL_PAGE, EMAIL_LIST_PAGE, EMAIL_DETAIL_PAGE, STUDENT_LIST_PAGE, USER_DETAIL_PAGE, TUTOR_LIST_PAGE, CHAT_ROOM_STUDENT_PAGE } from './routes'
import SignInPage from './pages/SignInPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import './firebaseConfig'
import AdminLayout from './layout/AdminLayout';
import ProfilePage from './pages/ProfilePage';
import ChatRoomTutorPage from './pages/ChatRoomTutorPage';
import MeetingListPage from './pages/MeetingListPage';
import MeetingDetailPage from './pages/MeetingDetailPage';
import EmailList from './pages/EmailListPage';
import EmailDetailPage from './pages/EmailDetailPage';
import StudentListPage from './pages/StudentListPage';
import UserDetailPage from './pages/UserDetailPage';
import TutorListPage from './pages/TutorListPage';
import ChatRoomStudentPage from './pages/ChatRoomStudentPage';
// import CalenderPage from './pages/CalenderPage';
// import Axios from 'axios';
// import { ApolloProvider } from '@apollo/react-hooks';
// import { client } from './ApolloConfig';

const pathAvoid = [SIGN_IN_PAGE, LANDING_PAGE, ADMIN_ERROR_PAGE]

function App() {
  return (
    // <ApolloProvider client={client}>
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
          <PrivateRoute exact path={CHAT_ROOM_TUTOR_PAGE}>
            <ChatRoomTutorPage />
          </PrivateRoute>
          <PrivateRoute exact path={CHAT_ROOM_STUDENT_PAGE}>
            <ChatRoomStudentPage />
          </PrivateRoute>
          <PrivateRoute exact path={MEETING_LIST_PAGE}>
            <MeetingListPage />
          </PrivateRoute>
          <PrivateRoute path={MEETING_DETAIL_PAGE}>
            <MeetingDetailPage />
          </PrivateRoute>
          <PrivateRoute exact path={EMAIL_LIST_PAGE}>
            <EmailList />
          </PrivateRoute>
          <PrivateRoute exact path={EMAIL_DETAIL_PAGE}>
            <EmailDetailPage />
          </PrivateRoute>

          <PrivateRoute exact path={STUDENT_LIST_PAGE}>
            <StudentListPage />
          </PrivateRoute>
          <PrivateRoute exact path={TUTOR_LIST_PAGE}>
            <TutorListPage />
          </PrivateRoute>
          <PrivateRoute path={USER_DETAIL_PAGE}>
            <UserDetailPage />
          </PrivateRoute>
        </Switch>
      </AdminLayout>

      <ToastContainer />
    </BrowserRouter>
    // </ApolloProvider>
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
