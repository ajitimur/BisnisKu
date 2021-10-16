import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
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
} from 'native-base';

export default function LoginScreen({ navigation }) {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <SafeAreaView>
      <View height="100%">
        <Image
          width="100%"
          height={550}
          justifyContent="flex-start"
          source={{
            uri: "https://images.pexels.com/photos/210990/pexels-photo-210990.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
          <Heading
            mt="140"
            color="light.300"
            size="2xl"
          >
            Financee{"  "}
          </Heading>
        </View>
        <View
          flex={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Box
            w="100%"
            height={425}
            roundedTop="45"
            bg="blue.400"
            alignItems="center"
          >
            <Heading
              color="dark.200"
              mt="8"
              size="lg"
            >
              Masuk{" "}
            </Heading>
            <VStack
              space={3}
              mt="5"
              w="70%"
            >
              <FormControl>
                <Input
                  type="email"
                  height="10"
                  size="md"
                  rounded="md"
                  placeholder="Email"
                  bg="white"
                  _focus={{
                    borderColor: "darkBlue.600",
                    borderWidth: '1.5px'
                  }}
                />
              </FormControl>
              <FormControl mt="2">
                <Input
                  type={show ? "text" : "password"}
                  overflow="visible"
                  InputRightElement={
                    <Button
                      bg="#ffffff00"
                      _pressed={{
                        bg: "#ffffff00"
                      }}
                      rounded="md"
                      onPress={handleClick}
                    >
                      {show ? "Hide " : "Show "}
                    </Button>
                  }
                  height="10"
                  rounded="md"
                  size="md"
                  placeholder="Password"
                  bg="white"
                  _focus={{
                    borderColor: "darkBlue.600",
                    borderWidth: '1.5px'
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
                  w="100%"
                  mt="2"
                  bg="darkBlue.600"
                  _text={{ color: 'white' }}
                  onPress={() => navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'MainTab' }
                      ],
                    })
                  )}
                >
                  Masuk
                </Button>
                <View
                  position="absolute"
                  bottom={-10}
                  bg="blue.400"
                  px="2"
                >
                  <Text>ATAU</Text>
                </View>
              </View>
              <View>
                <Button
                  w="100%"
                  mt="4"
                  bg="darkBlue.600"
                  _text={{ color: 'white' }}
                >
                  Social Login
                </Button>
              </View>
            </VStack>
            <View
              flex={1}
              justifyContent="flex-end"
              mb="4"
            >
              <View flexDirection="row">
                <Text>
                  Belum memiliki akun?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                  <Text color="lightBlue.100">Daftar sekarang{" "}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Box>
        </View>
      </View>
    </SafeAreaView>
  );
}
