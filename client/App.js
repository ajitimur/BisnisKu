import React from "react";
import { NavigationContainer } from "@react-navigation/native";
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
import { Provider } from "react-redux";
import { store } from "./src/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Pembelian"
        component={PembelianScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="Lainnya" component={LainnyaScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  async function checkToken() {
    try {
      const value = await AsyncStorage.getItem("access_token");
      if (value) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          {!checkToken() ? (
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="MainTab"
                component={MainTab}
                options={{
                  headerShown: false,
                }}
              />
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
          ) : (
            <Stack.Navigator initialRouteName="MainTab">
              <Stack.Screen
                name="MainTab"
                component={MainTab}
                options={{
                  headerShown: false,
                }}
              />
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
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
