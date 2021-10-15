import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NativeBaseProvider
} from 'native-base';
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  PembelianScreen,
  LainnyaScreen
} from './src/screens';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pembelian" component={PembelianScreen} />
      <Tab.Screen name="Lainnya" component={LainnyaScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              headerShown: false
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
              headerTitle: ""
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider >
  );
}
