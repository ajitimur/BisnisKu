import React from "react";
import { LoginScreen, RegisterScreen } from "../screens";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Signscreens = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
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
};

const styles = StyleSheet.create({});

export default Signscreens;
