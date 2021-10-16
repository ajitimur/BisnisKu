import React from 'react';
import {
  NativeBaseProvider,
  Text,
  Box,
  View,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Image,
} from 'native-base';

export default function RegisterScreen() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <NativeBaseProvider>
      <View
        flex={1}
        alignItems="center"
        justifyContent="center"
        bg="blue.400"
      >
        <Heading
          color="dark.200"
          size="lg"
        >
          Daftar{" "}
        </Heading>
        <VStack
          space={3}
          mt="3"
          w="70%"
        >
          <FormControl mt="1">
            <Input
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Username"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: '1.5px'
              }}
            />
          </FormControl>
          <FormControl mt="1">
            <Input
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Bussines Name"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: '1.5px'
              }}
            />
          </FormControl>
          <FormControl mt="1">
            <Input
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Bank Number"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: '1.5px'
              }}
            />
          </FormControl>
          <FormControl mt="1">
            <Input
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Phone Number"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: '1.5px'
              }}
            />
          </FormControl>
          <FormControl mt="1">
            <Input
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Address"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: '1.5px'
              }}
            />
          </FormControl>
          <FormControl mt="1">
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
          <FormControl mt="1">
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
              mt="1"
              bg="darkBlue.600"
              _text={{ color: 'white' }}
            >
              Daftar
            </Button>
            <View
              position="absolute"
              bottom={-10}
              bg="blue.400"
              px="1"
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
      </View>
    </NativeBaseProvider >
  );
}
