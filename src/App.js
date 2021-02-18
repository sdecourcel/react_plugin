import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from 'features/auth/PrivateRoute';

const SignIn = React.lazy(() => import('features/auth/SignIn'));
const SignUp = React.lazy(() => import('features/auth/SignUp'));
const SignOut = React.lazy(() => import('features/auth/SignOut'));
const Profile = React.lazy(() => import('features/profile/Profile'));
const EditIdentity = React.lazy(() => import('features/profile/EditIdentity'));
const PhoneConfirmation = React.lazy(() =>
  import('features/auth/PhoneConfirmation'),
);

const componentList = {
  'sign-up': '/inscription',
  'sign-in': '/connexion',
  'sign-out': '/deconnexion',
  profile: '/mon-compte',
};

function App({ component }) {
  const initialRoute = componentList[component] || null;

  return (
    <React.Suspense fallback={<p>chargement...</p>}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return initialRoute ? (
              <Redirect to={initialRoute} />
            ) : (
              <Redirect to="/connexion" />
            );
          }}
        />
        <Route component={SignIn} path="/connexion" exact />,
        <Route component={SignUp} path="/inscription" exact />,
        <Route
          path="/phone-confirmation"
          render={(props) => <PhoneConfirmation {...props}></PhoneConfirmation>}
        />
        ,
        <Route
          component={PhoneConfirmation}
          path="/password-reset-verification/:phone"
          exact
        />
        ,
        {/* <Route component={RequestPasswordReset} path="/forgot-password" exact />
        ,
        <Route
          component={RecoverPassword}
          path="/recover-password/:phone/:verificationCode"
          exact
        />
        ,*/}
        <PrivateRoute path="/mon-compte" exact>
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/mon-compte/modifier-identite" exact>
          <EditIdentity />
        </PrivateRoute>
        <PrivateRoute path="/deconnexion">
          <SignOut />
        </PrivateRoute>
      </Switch>
    </React.Suspense>
  );
}

export default App;
