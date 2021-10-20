import {
  FETCH_PRODUCTS,
  IS_LOGGED_IN,
  DETAIL_PRODUCT,
  GET_HUTANG,
  FETCH_LEDGERS,
  FETCH_CUSTOMERS,
  FETCH_INFO,
  isLoading,
} from "../keys";

const initState = {
  products: [],
  logStatus: false,
  detail: {},
  ledgers: [],
  hutang: [],
  customers: [],
  info: {},
  isLoading: false,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    case DETAIL_PRODUCT:
      return { ...state, detail: action.payload };
    case IS_LOGGED_IN:
      return { ...state, logStatus: action.payload };
    case FETCH_LEDGERS:
      return { ...state, ledgers: action.payload };
    case GET_HUTANG:
      return { ...state, hutang: action.payload };
    case FETCH_CUSTOMERS:
      return { ...state, customers: action.payload };
    case FETCH_INFO:
      return { ...state, info: action.payload };
    case isLoading:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
export default reducer;
