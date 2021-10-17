import React from "react";
import { NativeBaseProvider } from "native-base";
import Mainnavigation from "./src/navigations/MainNavigation";
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
