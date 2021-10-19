import { FETCH_PRODUCTS, IS_LOGGED_IN, DETAIL_PRODUCT } from "../keys";
import API from "../../apis/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
export function detailProduct(data) {
  return {
    type: DETAIL_PRODUCT,
    payload: data,
  };
}

// action async tembak ke server
export function getAllProduct() {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem("access_token")

    try {
      const products_get = await API({
        method: "GET",
        url: "/product/all",
        headers: { access_token: token },
      });
      dispatch(getProducts(products_get.data));
    } catch (err) {
      console.log(err, "<<<<<<");
    }
  };
}
export function getDetailProduct(id, token) {
  return async function (dispatch) {
    try {
      const detail_get = await API({
        method: "GET",
        url: `/product/${id}`,
        headers: { access_token: token },
      });
      dispatch(detailProduct(detail_get.data));
      console.log(detail_get.data);
    } catch (err) {
      console.log(err, "<<<<<<");
    }
  };
}
export function addNewProduct(token, data, endpoint) {
  return async function (dispatch) {
    try {
      const beliCash = await API({
        method: "POST",
        url: `/pembelian/${endpoint}`,
        headers: { access_token: token },
        data: data,
      });
      console.log(beliCash.data);
    } catch (err) {
      console.log(err.response.data, "<<<<<<");
    }
  };
}
export function addNewModal(token, data, endpoint) {
  return async function (dispatch) {
    try {
      const modalAdd = await API({
        method: "POST",
        url: `/modal/${endpoint}`,
        headers: { access_token: token },
        data: data,
      });
      console.log(modalAdd.data);
    } catch (err) {
      console.log(err.response.data, "<<<<<<");
    }
  };
}
