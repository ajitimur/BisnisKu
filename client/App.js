import React, { useEffect, useState } from "react";
import {
  NavigationContainer,
  CommonActions,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  PembelianScreen,
  LainnyaScreen,
} from "./src/screens";
import Mainnavigation from "./src/navigations/MainNavigation";
import { Provider } from "react-redux";
import { store } from "./src/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pembelian" component={PembelianScreen} />
      <Tab.Screen name="Lainnya" component={LainnyaScreen} />
    </Tab.Navigator>
  );
}

export default function App({ navigation }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const checkToken = async () => {
    // const navigation = useNavigation();
    try {
      const value = await AsyncStorage.getItem("access_token");
      console.log(value);
      if (value) {
        console.log("true");
        setIsSignedIn(true);
        return true;
      }
      console.log("false");
      setIsSignedIn(false);
      return false;
    } catch (err) {
      console.log(err);
    }
  };
  const signScreen = () => (
    <Stack.Navigator initialRouteName="Login">
      {console.log("ini sign screen")}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTransparent: true,
          headerShadowVisible: false,
          animation: "slide_from_right",
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );

  const appScreen = () => (
    <Stack.Navigator initialRouteName="MainTab">
      {console.log("ini app screen")}
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );

  useEffect(() => {
    console.log("???????????????????????");
    checkToken();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Mainnavigation />
      </NativeBaseProvider>
    </Provider>
  );
}
