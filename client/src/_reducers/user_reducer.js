import { 
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  TEMPORARY_USER
} from '../_actions/user_action';


export default function (state = {}, action) {
  switch (action.type) {
    case TEMPORARY_USER:
      return { ...state, temporaryUser: action.payload }
      break;
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload }
      break;
    case REGISTER_USER:
      return { ...state, register: action.payload }
      break;
    case AUTH_USER:
      return { ...state, userData: action.payload }
      break;
    default:
      return state;
  }
}