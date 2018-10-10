import { Reducer } from 'redux';
import { IAuthState, IUserAttributes } from './types';

const initialState: IAuthState = {
  loggedIn: undefined,
  user: null,
  userId: null,
  schemas: require("./schemas.json"),
  error: null,
  message: null,
  authPage: 'signIn',
  admin: null
};

const auth: Reducer<any> = (state: any = initialState, action): any => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      let admin = false;
      if (action.attributes["cognito:groups"] &&
        ~(action.attributes as IUserAttributes)["cognito:groups"].indexOf("admin")) {
        admin = true;
      }
      admin = true;

      return {
        ...state,
        loggedIn: true,
        user: action.attributes,
        userId: action.userId,
        admin: admin
      };
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        loggedIn: false
      };
    case "SET_AUTH_PAGE":
      return {
        ...state,
        authPage: action.authPage,
        message: action.message,
        error: action.error
      }
    case "SET_MESSAGE":
      return {
        ...state,
        message: action.message
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
};

export default auth;