import actions from "./actions";
const initialState = {
  products: {},
  totalProducts: 0,
};

export default function basketReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
