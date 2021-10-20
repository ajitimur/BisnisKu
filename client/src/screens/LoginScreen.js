import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../apis/API";
import {
  Text,
  Box,
  View,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Image,
  Alert,
  HStack,
  IconButton,
  CloseIcon,
  StatusBar,
  ScrollView,
} from "native-base";
import { useDispatch } from "react-redux";
import { changeLogStatus } from "../store/actions";
const BisnisKuLogo = require("../assets/img/BisnisKu-main-logo-02.png");

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userData;

  const handleLogin = (value, fieldName) => {
    setUserData({ ...userData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userLogin = await API({
        method: "POST",
        url: "/user/login",
        data: userData,
      });

      if (userLogin) {
        await AsyncStorage.setItem("access_token", userLogin.data.access_token);
        await AsyncStorage.setItem("user", username);
        dispatch(changeLogStatus(true));
      }
    } catch (error) {
      if (error) {
        setShowAlert(!showAlert);
        setUserData({
          username: "",
          password: "",
        });
      }
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <View bg="blue.400" h="100%">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Box safeAreaTop bg="lightBlue.700" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          width="100%"
          height={550}
          justifyContent="flex-start"
          source={{
            uri: "https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          }}
        />
        <View
          flex={1}
          position="absolute"
          bg="#27272ab3"
          w="100%"
          height={550}
          alignItems="center"
        >
          <Image
            source={BisnisKuLogo}
            alt="BisnisKu Logo"
            style={{
              width: 275,
              height: 275,
            }}
          />
        </View>
        <View
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
          mt="-35.5%"
        >
          <Box
            w="100%"
            height={425}
            roundedTop="45"
            bg="blue.400"
            alignItems="center"
          >
            <Heading color="dark.200" mt="8" size="lg">
              Masuk{" "}
            </Heading>
            <VStack space={3} mt="5" w="70%">
              <FormControl>
                <Input
                  onChangeText={(value) => handleLogin(value, "username")}
                  value={username}
                  type="text"
                  height="10"
                  size="md"
                  rounded="md"
                  placeholder="Username"
                  bg="white"
                  _focus={{
                    borderColor: "darkBlue.600",
                    borderWidth: "1.5px",
                  }}
                />
              </FormControl>
              <FormControl mt="2">
                <Input
                  onChangeText={(value) => handleLogin(value, "password")}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  overflow="visible"
                  InputRightElement={
                    <Button
                      bg="#ffffff00"
                      _pressed={{
                        bg: "#ffffff00",
                      }}
                      rounded="md"
                      onPress={handleClick}
                    >
                      {showPassword ? "Hide " : "Show "}
                    </Button>
                  }
                  height="10"
                  rounded="md"
                  size="md"
                  placeholder="Password"
                  bg="white"
                  _focus={{
                    borderColor: "darkBlue.600",
                    borderWidth: "1.5px",
                  }}
                />
              </FormControl>
              {showAlert ? (
                <Alert w="100%" h="12" status="error" mt="1">
                  <VStack space={1} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Text fontSize="sm" fontWeight="medium">
                          Username / password salah!
                        </Text>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        icon={<CloseIcon size="3" color="danger.600" />}
                        onPress={() => setShowAlert(false)}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              ) : null}
              <View
                border={2}
                pb="7"
                borderColor="dark.200"
                // borderBottomWidth={1}
                alignItems="center"
              >
                <Button
                  onPress={handleSubmit}
                  w="100%"
                  mt="2"
                  bg="darkBlue.600"
                  _text={{ color: "white" }}
                >
                  Masuk
                </Button>
              </View>
            </VStack>
            <View flex={0.2} justifyContent="flex-end" mb="20">
              <View flexDirection="row">
                <Text>Belum memiliki akun? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text color="lightBlue.100">Daftar sekarang </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Box>
        </View>
      </ScrollView>
    </View>
  );
}
