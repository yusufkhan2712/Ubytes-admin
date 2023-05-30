import actions from "./userActions";
const initialState = {
  user: null,
  role: null,
  mid: null,
  bid: null,
};

export default function basketReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actions.SET_ROLE:
      return {
        ...state,
        role: action.role,
      };
    case actions.SET_MID:
      return {
        ...state,
        mid: action.mid,
      };
    case actions.SET_BID:
      return {
        ...state,
        bid: action.bid,
      };
    default:
      return state;
  }
}
