import {
  FETCH_PRODUCTS,
  IS_LOGGED_IN,
  DETAIL_PRODUCT,
  SET_LEDGERS,
  GET_HUTANG,
} from "../keys";

const initState = {
  products: [],
  logStatus: false,
  detail: {},
  ledgers: [],
  hutang: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case DETAIL_PRODUCT:
      return { ...state, detail: action.payload };
    case IS_LOGGED_IN:
      return { ...state, logStatus: action.payload };
    case SET_LEDGERS:
      return { ...state, ledgers: action.payload };
    case GET_HUTANG:
      return { ...state, hutang: action.payload };
    default:
      return state;
  }
}
export default reducer;
