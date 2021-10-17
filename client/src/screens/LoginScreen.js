import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";
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
} from "native-base";
import { useDispatch } from "react-redux";
import { changeLogStatus } from "../store/actions";

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
    <SafeAreaView>
      <View height="100%">
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
          <Heading mt="140" color="light.300" size="2xl">
            Financee{"  "}
          </Heading>
        </View>
        <View flex={1} alignItems="center" justifyContent="flex-end">
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
                borderBottomWidth={1}
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
                <View position="absolute" bottom={-10} bg="blue.400" px="2">
                  <Text>ATAU</Text>
                </View>
              </View>
              <View>
                <Button
                  w="100%"
                  mt="4"
                  bg="darkBlue.600"
                  _text={{ color: "white" }}
                >
                  Social Login
                </Button>
              </View>
            </VStack>
            <View flex={1} justifyContent="flex-end" mb="4">
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
      </View>
    </SafeAreaView>
  );
}
