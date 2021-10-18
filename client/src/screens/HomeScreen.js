import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StatusBar,
  Text,
  Box,
  View,
  ScrollView
} from "native-base";
import {
  StackNavigationBox,
  FinancialStatementBox,
  InformationBox
} from "../components";


export default function HomeScreen() {
  const [userLogin, setUserLogin] = useState("");

  const getData = async () => {
    try {
      const userLogin = await AsyncStorage.getItem("user");
      if (userLogin) {
        setUserLogin(userLogin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      bg="muted.100"
      h="100%"
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Box
        safeAreaTop
        bg="blue.400"
      />
      <ScrollView>
        <Box
          bg="blue.400"
          roundedBottomLeft={70}
          h={125}
        >
          <View
            mx={30}
            mt={11}
          >
            <Text
              color="dark.200"
              fontWeight="semibold"
              fontSize="lg"
            >
              Hello, {userLogin}
            </Text>
          </View>
        </Box>
        <View mx={30}>
          <StackNavigationBox />
          <FinancialStatementBox />
          <View>
            <InformationBox />
          </View>
        </View >
      </ScrollView>
    </View >
  );
}
