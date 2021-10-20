import { FETCH_CUSTOMERS } from "../keys";
import { getAllProduct, getInfoKeuangan } from ".";
import API from "../../apis/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setCustomers(payload) {
  return {
    type: FETCH_CUSTOMERS,
    payload,
  };
}

export function fetchCustomers() {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem("access_token");

    try {
      const customers = await API({
        method: "GET",
        url: "/customer",
        headers: {
          access_token: token,
        },
      });

      dispatch(setCustomers(customers.data));
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export function addCustomer(payload) {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem("access_token");

    try {
      const newCustomer = await API({
        method: "POST",
        url: `/customer`,
        headers: {
          access_token: token,
        },
        data: payload,
      });
      dispatch(fetchCustomers());
      // console.log(newCustomer);
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export function addPenjualan(payload, endPoint) {
  return async function (dispatch) {
    const token = await AsyncStorage.getItem("access_token");

    try {
      const newPenjualan = await API({
        method: "POST",
        url: `/penjualan/${endPoint}`,
        headers: {
          access_token: token,
        },
        data: payload,
      });
      dispatch(getAllProduct());
      dispatch(getInfoKeuangan());
      // console.log(newPenjualan);
    } catch (error) {
      console.log(error.response.data);
    }
  };
}
