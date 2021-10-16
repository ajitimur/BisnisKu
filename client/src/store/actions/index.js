import { FETCH_PRODUCTS } from "../keys";

export function getProducts(data) {
  return {
    type: FETCH_PRODUCTS,
    payload: data,
  };
}

// action async tembak ke server
