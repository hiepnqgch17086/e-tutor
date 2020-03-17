import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import { SIGN_IN_PAGE, getIsAuthorized, HOME_PAGE, LANDING_PAGE, PROFILE_PAGE, PROFILE_EDIT_PAGE } from './routes'
import SignInPage from './pages/SignInPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import './firebaseConfig'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={SIGN_IN_PAGE} component={SignInPage} />
        <Route exact path={LANDING_PAGE} component={LandingPage} />
        <PrivateRoute exact path={HOME_PAGE}>
          <HomePage />
        </PrivateRoute>
        <PrivateRoute exact path={PROFILE_PAGE}>
          <ProfilePage />
        </PrivateRoute>
        <PrivateRoute exact path={PROFILE_EDIT_PAGE}>
          <ProfileEditPage />
        </PrivateRoute>
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

export default App;
