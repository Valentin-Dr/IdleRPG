import { LOGMODALE, UPDATE_FIELD, LOG_USER, POSTER_MENU, DARK_MODE, LOGOUT, SUBSCRIBE_USER } from "../actions/user";
const initialState = {
  modal: "",
  email: "",
  password: "",
  name: "",
  logged:false,
  logError:'',
  loggedName:'',
  userId:0,
  mobMenu: false,
  darkMode:false,
};
const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGMODALE:
      return {
        ...state,
        modal: action.modal,
      };
    case UPDATE_FIELD:
      // console.log(state.logged);
      return {
        ...state,
        [action.name]: action.value,
      };
    case LOG_USER:
      localStorage.removeItem('profile');
      localStorage.removeItem('name');
      localStorage.removeItem('userId');
      localStorage.setItem('profile', JSON.stringify(action.token));
      localStorage.setItem('name', JSON.stringify(action.userName));
      localStorage.setItem('userId', JSON.stringify(action.userId));
      return {
        ...state,
        loggedName : action.userName,
        userId: action.userId,
        name:'',
        email: '',
        password: '',
        logged: true,
        logError: '',
        modal: '',
      };
    case POSTER_MENU:
      return {
        ...state,
        mobMenu: !state.mobMenu,
      };
    case DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case LOGOUT:
      return {
        ...state,
        logged: false,
        name: '',
        userId: '',
      };
    case SUBSCRIBE_USER:
      return {
        ...state,
        modal: '',
      };
    default:
      return state;
  }
};
export default user;
