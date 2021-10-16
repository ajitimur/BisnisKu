import React, { useState } from "react";
import API from "../apis/API";
import { CommonActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Text,
  View,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  ScrollView,
} from "native-base";

export default function RegisterScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    businessName: "",
    bankNumber: "",
    phoneNumber: "",
    address: "",
    email: "",
    password: "",
  });

  const {
    username,
    businessName,
    bankNumber,
    phoneNumber,
    address,
    email,
    password,
  } = userData;

  const handleRegister = (value, fieldName) => {
    setUserData({ ...userData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userRegister = await API({
        method: "POST",
        url: "/user/register",
        data: userData,
      });

      console.log(userRegister);

      if (userRegister) {
        navigation.dispatch(CommonActions.goBack());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <SafeAreaView>
      <ScrollView bg="blue.400" h="100%">
        <View
          mt={24}
          mb={30}
          flex={1}
          alignItems="center"
          justifyContent="center"
        >
          <Heading color="dark.200" size="lg">
            Daftar{" "}
          </Heading>
          <VStack space={3} mt="3" w="70%">
            <FormControl mt="1">
              <Input
                onChangeText={(value) => handleRegister(value, "username")}
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
            <FormControl mt="1">
              <Input
                onChangeText={(value) => handleRegister(value, "businessName")}
                value={businessName}
                type="text"
                height="10"
                size="md"
                rounded="md"
                placeholder="Nama bisnis / toko"
                bg="white"
                _focus={{
                  borderColor: "darkBlue.600",
                  borderWidth: "1.5px",
                }}
              />
            </FormControl>
            <FormControl mt="1">
              <Input
                onChangeText={(value) => handleRegister(value, "bankNumber")}
                value={bankNumber}
                type="text"
                height="10"
                size="md"
                rounded="md"
                placeholder="Nomor bank"
                bg="white"
                _focus={{
                  borderColor: "darkBlue.600",
                  borderWidth: "1.5px",
                }}
                keyboardType="numeric"
              />
            </FormControl>
            <FormControl mt="1">
              <Input
                onChangeText={(value) => handleRegister(value, "phoneNumber")}
                value={phoneNumber}
                type="text"
                height="10"
                size="md"
                rounded="md"
                placeholder="Nomor telepon"
                bg="white"
                _focus={{
                  borderColor: "darkBlue.600",
                  borderWidth: "1.5px",
                }}
                keyboardType="numeric"
              />
            </FormControl>
            <FormControl mt="1">
              <Input
                onChangeText={(value) => handleRegister(value, "address")}
                value={address}
                type="text"
                height="10"
                size="md"
                rounded="md"
                placeholder="Alamat"
                bg="white"
                _focus={{
                  borderColor: "darkBlue.600",
                  borderWidth: "1.5px",
                }}
              />
            </FormControl>
            <FormControl mt="1">
              <Input
                onChangeText={(value) => handleRegister(value, "email")}
                value={email}
                type="email"
                height="10"
                size="md"
                rounded="md"
                placeholder="Email"
                bg="white"
                _focus={{
                  borderColor: "darkBlue.600",
                  borderWidth: "1.5px",
                }}
                keyboardType="email-address"
              />
            </FormControl>
            <FormControl mt="1">
              <Input
                onChangeText={(value) => handleRegister(value, "password")}
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
                mt="1"
                bg="darkBlue.600"
                _text={{ color: "white" }}
              >
                Daftar
              </Button>
              <View position="absolute" bottom={-10} bg="blue.400" px="1">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
