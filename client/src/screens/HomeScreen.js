import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text
} from "native-base";
import React from "react";

export default function HomeScreen() {
  return (
    <View>
      <Text>Home screen</Text>
      <StatusBar style="auto" />
    </View>
  )
}