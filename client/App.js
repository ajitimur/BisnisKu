import React from "react";
import { NativeBaseProvider } from "native-base";
import Mainnavigation from "./src/navigations/MainNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ProdukScreen,
  LainnyaScreen,
  TransaksiScreen,
} from "./src/screens";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Mainnavigation />
      </NativeBaseProvider>
    </Provider>
  );
}
