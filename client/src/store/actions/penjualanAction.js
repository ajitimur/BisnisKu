import {
  FETCH_CUSTOMERS
} from "../keys"
import API from "../../apis/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setCustomers(payload) {
  return {
    type: FETCH_CUSTOMERS,
    payload
  }
}

export function addCustomer(payload) {
  return async function (reducer) {
    const token = await AsyncStorage.getItem("access_token")

    try {
      const newCustomer = await API({
        method: "POST",
        url: `/customer`,
        headers: {
          access_token: token
        },
        data: payload
      })

      console.log(newCustomer);
    } catch (error) {
      console.log(error.response.data);
    }
  }
}