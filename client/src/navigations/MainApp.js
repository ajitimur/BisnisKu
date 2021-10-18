import React from "react";
import {
  HomeScreen,
  LainnyaScreen,
  TransaksiScreen,
} from "../screens";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Productscreen from "../screens/ProductScreen";
import AddNewProduct from "../screens/AddNewProduct";
import Beliproduk from "../screens/BeliProduk";

const Mainapp = () => {
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

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Produk") {
              iconName = "boxes";
            } else if (route.name === "Lainnya") {
              iconName = "user";
            }

            // You can return any component that you like here!
            return (
              <FontAwesomeIcon name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#005db4",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Produk" component={Productscreen} />
        <Tab.Screen name="Lainnya" component={LainnyaScreen} />
      </Tab.Navigator>
    );
  }
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="MainTab">
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
          headerTransparent: true,
          headerShadowVisible: false,
          animation: "slide_from_right",
          headerTitle: "Tambah Transaksi",
        }}
      />
      <Stack.Screen
        name="TambahProduk"
        component={AddNewProduct}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BeliProduk"
        component={Beliproduk}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});

export default Mainapp;
