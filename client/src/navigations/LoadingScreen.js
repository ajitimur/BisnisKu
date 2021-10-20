import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
  Image,
} from "native-base";

const Loadingscreen = () => {
  return (
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Loading
      </Heading>
    </HStack>
  );
};

const styles = StyleSheet.create({});

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Loadingscreen />
      </Center>
    </NativeBaseProvider>
  );
};
