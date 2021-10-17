import { FETCH_PRODUCTS } from "../keys";

const initState = {
  products: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
export default reducer;
