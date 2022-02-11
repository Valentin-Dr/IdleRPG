export const LOGMODALE = "LOGMODALE";
export const UPDATE_FIELD = "UPDATE_FIELD";
export const SUBSCRIBE_USER = "SUBSCRIBE_USER";
export const LOG_USER = "LOG_USER";
export const LOGIN_USER = "LOGIN_USER";
export const POSTER_MENU = "POSTER_MENU";
export const DARK_MODE = "DARK_MODE";
export const CHECK_USER = 'CHECK_USER';
export const LOGOUT = 'LOGOUT';

export const checkUser = () => ({ 
  type: CHECK_USER,
});

export const setModale = (modal) => ({
  type: LOGMODALE,
  modal: modal,
});

export const setUpdateField = (name, value) => ({
  type: UPDATE_FIELD,
  name: name,
  value: value,
});

export const subscribeUser = () => ({
  type: SUBSCRIBE_USER,
});

export const logUser = (token, userName, userId) => ({
  type: LOG_USER,
  token,
  userName,
  userId,
})

export const connectUser = () => ({
  type: LOGIN_USER,
})

export const posterMenu = () => ({
  type: POSTER_MENU,
})

export const setDarkMode = () => ({
  type: DARK_MODE,
})

export const logout = () => ({
  type: LOGOUT,
});
