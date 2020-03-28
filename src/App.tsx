import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { SIGN_IN_PAGE, getIsAuthorized, HOME_PAGE, LANDING_PAGE, PROFILE_PAGE, PROFILE_EDIT_PAGE, USERS_PAGE, ADMIN_ERROR_PAGE, CLASS_LIST_PAGE, USER_PAGE, CLASS_ADD_PAGE, USER_ADD_PAGE } from './routes'
import SignInPage from './pages/SignInPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import './firebaseConfig'
import UsersPage from './pages/UsersPage';
import ProfilePageData from './pages/ProfilePage/data';
import { IS_ADMIN } from './models-one-prop/role';
import ClassListPage from './pages/ClassListPage';
import ClassAddPage from './pages/ClassAddPage';
import AdminLayout from './layout/AdminLayout';
import UserDetailPage from './pages/UserDetailPage';
import UserAddPage from './pages/UserAddPage';

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


          <PrivateRoute exact path={CLASS_LIST_PAGE}>
            <ClassListPage />
          </PrivateRoute>
          <PrivateRouteAdmin exact path={CLASS_ADD_PAGE}>
            <ClassAddPage />
          </PrivateRouteAdmin>
          <PrivateRoute exact path={PROFILE_PAGE}>
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute exact path={PROFILE_EDIT_PAGE}>
            <ProfileEditPage />
          </PrivateRoute>

          <PrivateRouteAdmin exact path={USERS_PAGE}>
            <UsersPage />
          </PrivateRouteAdmin>
          <PrivateRouteAdmin exact path={USER_ADD_PAGE}>
            <UserAddPage />
          </PrivateRouteAdmin>
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
    {ProfilePageData.currentUser.role === IS_ADMIN ? children : <Redirect to={CLASS_LIST_PAGE || HOME_PAGE} />}
  </Route>
}

export default App;
