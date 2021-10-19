import {
  SET_LEDGERS
} from "../keys"
import API from "../../apis/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function setLedgers(payload) {
  return {
    type: SET_LEDGERS,
    payload
  }
}

export function addPengeluaran(payload, endPoint) {
  return async function (reducer) {
    const token = await AsyncStorage.getItem("access_token")

    try {
      const newPengeluaran = await API({
        method: "POST",
        url: `/pengeluaran/${endPoint}`,
        headers: {
          access_token: token
        },
        data: payload
      })

      console.log(newPengeluaran.data.message);
    } catch (error) {
      console.log(error.response.data);
    }
  }
}