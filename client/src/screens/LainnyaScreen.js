import React, { useState } from "react";
import { CommonActions } from "@react-navigation/native";
// import { View, Text, Button } from "native-base";
import { Button, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { changeLogStatus } from "../store/actions";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Alert } from "react-native";

export default function LainnyaScreen() {
  const dispatch = useDispatch();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    console.log(formattedDate);

    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Text>Lainnya Screen</Text>
      <Button mb="3" title="Show Date Picker" onPress={showDatePicker}></Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button
        title="Logout"
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("access_token");
            await AsyncStorage.removeItem("user");
            dispatch(changeLogStatus(false));
          } catch (err) {
            console.log(err);
          }
        }}
      ></Button>
    </View>
  );
}
