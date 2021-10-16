import React from "react";
import { HomeScreen, PembelianScreen, LainnyaScreen } from "../screens";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Mainapp = () => {
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
  const Stack = createNativeStackNavigator();
  return (
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
};

const styles = StyleSheet.create({});

export default Mainapp;
