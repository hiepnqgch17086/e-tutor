import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { SIGN_IN_PAGE, getIsAuthorized, HOME_PAGE, LANDING_PAGE, PROFILE_PAGE, PROFILE_EDIT_PAGE, ALL_USERS_PAGE, ADMIN_ERROR_PAGE, CLASS_LIST_PAGE, USER_PAGE, CLASS_FORM_PAGE } from './routes'
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
import ClassFormPage from './pages/ClassFormPage';
import AdminLayout from './layout/AdminLayout';
import UserDetailPage from './pages/UserDetailPage';

const pathAvoid = [SIGN_IN_PAGE, LANDING_PAGE, ADMIN_ERROR_PAGE]

function App() {
  return (
    <BrowserRouter>
      <Route exact path={SIGN_IN_PAGE} component={SignInPage} />
      <Route exact path={LANDING_PAGE} component={LandingPage} />
      <Route exact path={ADMIN_ERROR_PAGE} component={AdminErrorPage} />

      <AdminLayout pathAvoid={pathAvoid}>
        <Switch>
          <PrivateRoute exact path={HOME_PAGE}>
            <HomePage />
          </PrivateRoute>
          <PrivateRouteAdmin exact path={ALL_USERS_PAGE}>
            <AllUsersPage />
          </PrivateRouteAdmin>

          <PrivateRoute exact path={CLASS_LIST_PAGE}>
            <ClassListPage />
          </PrivateRoute>
          <PrivateRouteAdmin exact path={CLASS_FORM_PAGE}>
            <ClassFormPage />
          </PrivateRouteAdmin>
          <PrivateRoute exact path={PROFILE_PAGE}>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute exact path={PROFILE_EDIT_PAGE}>
            <ProfileEditPage />
          </PrivateRoute>

          <PrivateRoute path={USER_PAGE}>
            <UserDetailPage />
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

const PrivateRouteAdmin = ({ children = <></>, ...rest }) => {
  return <Route {...rest}>
    {ProfilePageData.currentUser.role === IS_ADMIN ? children : <Redirect to={ADMIN_ERROR_PAGE} />}
  </Route>
}

export default App;
