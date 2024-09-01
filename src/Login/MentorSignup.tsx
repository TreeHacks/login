import React from "react";
import { connect } from 'react-redux';
import "./Login.scss";
import { checkLoginStatus, logout, signIn, signUp, forgotPassword, forgotPasswordSubmit, resendSignup, changePassword, exchangeAuthCode, validateEmail, mentorSignup } from "../store/auth/actions";
import { logo } from "../constants";
import AuthPageNavButton from "./AuthPageNavButton";
import Form from "react-jsonschema-form";
import { IAuthState } from "../store/auth/types";
import StanfordLogin from "./StanfordLogin";
import LoggedIn from "./LoggedIn";

declare const HELP_URL: string;

const mapStateToProps = state => ({
  ...state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  logout: () => dispatch(logout()),
  signIn: data => dispatch(signIn(data)),
  signUp: data => dispatch(signUp(data)),
  validateEmail: data => dispatch(validateEmail(data)),
  forgotPassword: data => dispatch(forgotPassword(data)),
  forgotPasswordSubmit: data => dispatch(forgotPasswordSubmit(data)),
  resendSignup: () => dispatch(resendSignup()),
  changePassword: data => dispatch(changePassword(data)),
  exchangeAuthCode: e => dispatch(exchangeAuthCode(e)),
  mentorSignup: e => dispatch(mentorSignup(e))
});


export interface IMentorSignupProps extends IAuthState {
  checkLoginStatus: () => void,
  logout: () => void,
  setup: () => void,
  signIn: (e) => void,
  signUp: (e) => void,
  validateEmail: (e) => void,
  forgotPassword: (e) => void,
  forgotPasswordSubmit: (e) => void,
  resendSignup: () => void,
  changePassword: (e) => void,
  exchangeAuthCode: (e) => void,
  mentorSignup: (e) => void
};

function transformErrors(errors) {
  return errors;
}

function validate(formData, errors) {
  // if (formData.email && ~formData.email.toLowerCase().indexOf("@stanford.edu")) {
  //   errors.email.addError("If you are a Stanford student, please make sure you click 'Sign in with Stanford.'");
  // }
  return errors;
}

function AuthForm(props) {
  return <Form {...props} showErrorList={false} transformErrors={transformErrors} validate={validate} className="treehacks-form login-form" />
}
export class MentorSignup extends React.Component<IMentorSignupProps, { formData: any }> {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    };
  }

  componentDidMount() {
    sessionStorage.setItem("redirect", HELP_URL);
    this.props.checkLoginStatus();
  }

  render() {
    const isStanfordEmail = (this.state.formData.email || '').indexOf('@stanford.edu') !== -1;
    if (!this.props.loggedIn) {
      return (<div className="login-container"><div className="treehacks-login">
        <div className="text-center">
          <a href="">
            <img src={logo} width="114px" height="124px" style={{ "marginTop": 49 }} />
          </a>
        </div>
        <a href="" className="wordmark">
          <h2 className="h3-style">TREEHACKS</h2>
        </a>
        <h3 className="h3-style">mentor signup</h3>
        {this.props.message && <div className="alert alert-info" role="alert">
          {this.props.message}
        </div>
        }
        {this.props.error && <div className="alert alert-danger" role="alert">
          {this.props.error}
          {this.props.error == "User is not confirmed." &&
            <div>
              <a href="#" onClick={() => this.props.resendSignup()}>Resend email confirmation link</a>
            </div>
          }
        </div>}
        {this.props.authPage === "defaultPage" &&
          <div className="top-form">
            <AuthForm
              formData={this.state.formData}
              schema={Object.assign({}, this.props.schemas.validateEmail.schema)}
              uiSchema={Object.assign({}, this.props.schemas.validateEmail.uiSchema)}
              onSubmit={e => this.props.mentorSignup(e.formData)}
              onChange={e => this.setState({ formData: e.formData })}
            >
              {!isStanfordEmail ?
                <button className="btn btn-info" type="submit">Continue</button>
                : <div></div>}
            </AuthForm>
          </div>
        }
        {this.props.authPage == "signIn" &&
          <div className="top-form">
            <AuthForm
              formData={this.state.formData}
              schema={Object.assign({}, this.props.schemas.signIn.schema, isStanfordEmail && { properties: { email: this.props.schemas.signIn.schema.properties.email }, required: ['email'] })}
              uiSchema={Object.assign({}, this.props.schemas.signIn.uiSchema, isStanfordEmail && { 'ui:order': ['email'] })}
              onSubmit={e => this.props.signIn(e.formData)}
              onChange={e => this.setState({ formData: e.formData })}
            >
              {!isStanfordEmail ?
                <button className="btn btn-info" type="submit">Sign In</button>
                : <div></div>}
            </AuthForm>
            {isStanfordEmail ?
              <div style={{ marginTop: -40 }}><StanfordLogin label="Sign in with Stanford" /></div>
              : null}
            <div className="mt-1 left-btn">
              <AuthPageNavButton current={this.props.authPage} page="forgotPassword" label="Forgot Password" />
            </div>
          </div>

        }
        {this.props.authPage == "signUp" &&
          <div className="top-form">
            <AuthForm
              formData={this.state.formData}
              schema={Object.assign({}, this.props.schemas.signUp.schema, isStanfordEmail && { properties: { email: this.props.schemas.signUp.schema.properties.email }, required: ['email'] })}
              uiSchema={Object.assign({}, this.props.schemas.signUp.uiSchema, isStanfordEmail && { 'ui:order': ['email'] })}
              onSubmit={e => this.props.signUp(e.formData)}
              onChange={e => this.setState({ formData: e.formData })}
            >
              {!isStanfordEmail ?
                <button className="btn btn-info" type="submit">Sign Up</button>
                : <div></div>}
            </AuthForm>
            {isStanfordEmail ?
              <div style={{ marginTop: -40 }}><StanfordLogin label="Sign up with Stanford" /></div>
              : null}
          </div>
        }
        {this.props.authPage == "forgotPassword" &&
          <AuthForm
            schema={this.props.schemas.forgotPassword.schema}
            uiSchema={this.props.schemas.forgotPassword.uiSchema}
            onSubmit={e => this.props.forgotPassword(e.formData)}
          >
            <button className="btn btn-info" type="submit">Send reset instructions</button>
          </AuthForm>
        }
        {this.props.authPage == "forgotPasswordSubmit" &&
          <AuthForm
            schema={this.props.schemas.forgotPasswordSubmit.schema}
            uiSchema={this.props.schemas.forgotPasswordSubmit.uiSchema}
            onSubmit={e => this.props.forgotPasswordSubmit(e.formData)} />
        }
        {this.props.authPage === "changePassword" &&
          <AuthForm
            schema={this.props.schemas.changePassword.schema}
            uiSchema={this.props.schemas.changePassword.uiSchema}
            onSubmit={e => this.props.changePassword(e.formData)}
          >
            <button className="btn btn-info" type="submit">Update password</button>
          </AuthForm>
        }
        {/* {this.props.authPage !== "defaultPage" &&
          <div className="mt-1 back-container">
            <AuthPageNavButton current={this.props.authPage} page="defaultPage" label="Back" className="btn-back" />
          </div>
        } */}
      </div></div>);
    }
    else {
      return <LoggedIn />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentorSignup);