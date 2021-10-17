import React from "react";
import { CommonActions } from "@react-navigation/native";
import { View, Text, Button } from "native-base";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLogStatus } from "../store/actions";

export default function LainnyaScreen() {
  const dispatch = useDispatch();
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>Lainnya Screen</Text>
      <Button
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("access_token");
            await AsyncStorage.removeItem("user");
            dispatch(changeLogStatus(false));
          } catch (err) {
            console.log(err);
          }
        }}
      >
        Logout
      </Button>
    </View>
  );
}
