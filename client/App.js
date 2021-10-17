import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5"
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ProdukScreen,
  LainnyaScreen,
  TransaksiScreen
} from "./src/screens";
import { Provider } from "react-redux";
import { store } from "./src/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 60,
          position: "absolute",
          bottom: 15,
          right: 15,
          left: 15,
          borderRadius: 15,
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = "home"
          } else if (route.name === 'Produk') {
            iconName = "boxes"
          } else if (route.name === "Lainnya") {
            iconName = "user"
          }

          // You can return any component that you like here!
          return <FontAwesomeIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#005db4",
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Produk"
        component={ProdukScreen}
      />
      <Tab.Screen
        name="Lainnya"
        component={LainnyaScreen}
      />
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
                name="Transaksi"
                component={TransaksiScreen}
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
