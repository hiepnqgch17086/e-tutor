import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { SIGN_IN_PAGE, getIsAuthorized, HOME_PAGE, LANDING_PAGE, PROFILE_PAGE, PROFILE_EDIT_PAGE, ALL_USERS_PAGE, ADMIN_ERROR_PAGE, CLASS_LIST_PAGE } from './routes'
import SignInPage from './pages/SignInPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import './firebaseConfig'
import AllUsersPage from './pages/AllUsersPage';
import ProfilePageData from './pages/ProfilePage/data';
import { IS_ADMIN } from './models-one-prop/role';
import AdminErrorPage from './pages/AdminErrorPage';
import ClassListPage from './pages/ClassListPage';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={SIGN_IN_PAGE} component={SignInPage} />
        <Route exact path={LANDING_PAGE} component={LandingPage} />
        <Route exact path={ADMIN_ERROR_PAGE} component={AdminErrorPage} />
        <PrivateRoute exact path={HOME_PAGE}>
          <HomePage />
        </PrivateRoute>
        <PrivateRoute exact path={PROFILE_PAGE}>
          <ProfilePage />
        </PrivateRoute>
        <PrivateRoute exact path={PROFILE_EDIT_PAGE}>
          <ProfileEditPage />
        </PrivateRoute>
        <PrivateRoute exact path={CLASS_LIST_PAGE}>
          <ClassListPage />
        </PrivateRoute>
        <PrivateRouteAdmin exact path={ALL_USERS_PAGE}>
          <AllUsersPage />
        </PrivateRouteAdmin>
      </Switch>
      <ToastContainer />
    </BrowserRouter>
  );
}

const PrivateRoute = ({ children = <></>, ...rest }) => {
  return <Route {...rest}>
    {getIsAuthorized() ? children : <Redirect to={SIGN_IN_PAGE} />}
  </Route>
}

const PrivateRouteAdmin = ({ children = <></>, ...rest }) => {
  return <Route {...rest}>
    {ProfilePageData.currentUser.role === IS_ADMIN ? children : <Redirect to={ADMIN_ERROR_PAGE} />}
  </Route>
}

export default App;
