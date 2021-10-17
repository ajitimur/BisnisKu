import { FETCH_PRODUCTS, IS_LOGGED_IN } from "../keys";

export function getProducts(data) {
  return {
    type: FETCH_PRODUCTS,
    payload: data,
  };
}
export function changeLogStatus(data) {
  return {
    type: IS_LOGGED_IN,
    payload: data,
  };
}

// action async tembak ke server
