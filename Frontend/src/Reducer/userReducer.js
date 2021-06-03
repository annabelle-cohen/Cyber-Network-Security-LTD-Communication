import { SAVE_USER } from "../Constant/action-types";

const iniState = {
  isLoggedIn: false,
  user: {
    email: "",
    password: "",
    isBlocked: false,
    isResetChanged: false,
    history: {},
  },
};

const userReducer = (state = iniState, action) => {
  if (action.type === SAVE_USER) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default userReducer;
