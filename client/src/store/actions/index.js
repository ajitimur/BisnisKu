import {
  FETCH_PRODUCTS,
  IS_LOGGED_IN,
  DETAIL_PRODUCT,
  GET_HUTANG,
  FETCH_INFO,
  isLoading,
  errorMsg,
} from "../keys";
import API from "../../apis/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getProducts(data) {
  return {
    type: FETCH_PRODUCTS,
    payload: data,
  };
}
export function errorMessages(data) {
  return {
    type: errorMsg,
    payload: data,
  };
}
export function getInfo(data) {
  return {
    type: FETCH_INFO,
    payload: data,
  };
}
export function changeLogStatus(data) {
  return {
    type: IS_LOGGED_IN,
    payload: data,
  };
}
export function changeIsLoading(data) {
  return {
    type: isLoading,
    payload: data,
  };
}
export function detailProduct(data) {
  return {
    type: DETAIL_PRODUCT,
    payload: data,
  };
}
export function hutangGet(data) {
  return {
    type: GET_HUTANG,
    payload: data,
  };
}

// action async tembak ke server
export function getAllProduct() {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem("access_token");

    try {
      dispatch(changeIsLoading(true));
      const products_get = await API({
        method: "GET",
        url: "/product/all",
        headers: { access_token: token },
      });
      dispatch(getProducts(products_get.data));
      dispatch(changeIsLoading(false));
    } catch (err) {
      dispatch(changeIsLoading(false));
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
export function addNewProduct(data, endpoint) {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem("access_token");
      await API({
        method: "POST",
        url: `/pembelian/${endpoint}`,
        headers: { access_token: token },
        data: data,
      });
      dispatch(getAllProduct());
    } catch (err) {
      dispatch(errorMessages({ msg: err.response.data }));
      console.log(err.response.data, "<<<<<<");
    }
  };
}
export function addNewModal(data, endpoint) {
  return async function (dispatch) {
    try {
      const token = await AsyncStorage.getItem("access_token");
      await API({
        method: "POST",
        url: `/modal/${endpoint}`,
        headers: { access_token: token },
        data: data,
      });
      dispatch(getInfoKeuangan(token));
      // console.log(modalAdd.data);
    } catch (err) {
      console.log(err.response.data, "<<<<<<");
    }
  };
}
export function getHutang(token, endpoint) {
  return async function (dispatch) {
    dispatch(changeIsLoading(true));
    try {
      const hutang_get = await API({
        method: "GET",
        url: `/transaction/${endpoint}`,
        headers: { access_token: token },
      });
      dispatch(hutangGet(hutang_get.data));
      dispatch(changeIsLoading(false));
    } catch (err) {
      dispatch(changeIsLoading(false));
      console.log(err, "<<<<<<");
    }
  };
}
export function tagihCustomer(token, id) {
  return async function () {
    try {
      await API({
        method: "POST",
        url: `/pembayaran/${id}`,
        headers: { access_token: token },
      });
      // dispatch(hutangGet(pembayaranHutang.data));
    } catch (err) {
      console.log(err, "<<<<<<");
    }
  };
}
export function getInfoKeuangan() {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem("access_token");

    try {
      const info_get = await API({
        method: "GET",
        url: "/reports/saldo",
        headers: { access_token: token },
      });
      dispatch(getInfo(info_get.data));
    } catch (err) {
      console.log(err, "<<<<<<");
    }
  };
}
