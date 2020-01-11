import React from "react";
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from "./history";
import { Switch, Route, Redirect } from "react-router-dom";
import { IBaseState } from "./store/base/types";
import Login from "./Login/Login";
import LoggedIn from "./Login/LoggedIn";
import Logout from "./Login/Logout";
import Loading from "./Loading/Loading";
import "bootstrap/dist/css/bootstrap.css";
import { IAuthState } from "./store/auth/types";
import "./App.scss";
import Verify from "./Login/Verify";
import Helmet from "react-helmet";
import { favicon } from "./constants";
import "./FormPage/FormPage.scss";

const mapStateToProps = state => ({
  ...state.base,
  loggedIn: (state.auth as IAuthState).loggedIn,
  sponsor: (state.auth as IAuthState).sponsor,
  judge: (state.auth as IAuthState).judge
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

interface IAppProps extends IBaseState {
  loggedIn: boolean,
  sponsor: boolean,
  judge: boolean
}

const App = (props: IAppProps) => (
  <ConnectedRouter history={history}>
    <div className="treehacks-main">
      <Helmet>
        <link rel="icon" type="image/png" href={favicon} />
      </Helmet>
      {props.loading && <Loading />}
      <Switch>
        <Route path="/verify" component={Verify} />
        <Route path="/logout" component={Logout} />
        <Route render={() => <MainRoutes {...props} />} />
      </Switch>
    </div>
  </ConnectedRouter>);
const MainRoutes = (props: IAppProps) => (
  <div>
    <Login />
    {props.loggedIn === false &&
      null
    }
    {props.loggedIn === true &&
      <LoggedIn />
    }
  </div>);

export default connect(mapStateToProps, mapDispatchToProps)(App);
