import React from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import { Text, Box, View, Button, Heading } from "native-base";
import { useNavigation } from "@react-navigation/native";

export default function InformationBox() {
  const navigation = useNavigation();
  return (
    <>
      <Box
        rounded="xl"
        bg="white"
        shadow={4}
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Heading fontSize={17} py="3">
          Catat Transaksi Keuangan Anda
        </Heading>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <View flexDirection="row">
            <FontAwesomeIcon name="check" color="green" />
            <Text ml="2" mt="-1" maxW={32}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              nec
            </Text>
          </View>
          <View flexDirection="row">
            <FontAwesomeIcon name="check" color="green" />
            <Text ml="2" mt="-1" maxW={32}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              nec
            </Text>
          </View>
        </View>
        <Button
          rounded="3xl"
          h="8"
          bg="blue.400"
          style={{
            marginVertical: 20,
          }}
        >
          Catat Transaksi
        </Button>
      </Box>
      <Box
        rounded="xl"
        bg="white"
        shadow={4}
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
          marginBottom: 95,
        }}
      >
        <Heading fontSize={17} py="3">
          Catat Customer Yang Hutang Dengan Anda!
        </Heading>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <View flexDirection="row">
            <FontAwesomeIcon name="check" color="green" />
            <Text ml="2" mt="-1" maxW={32}>
              Selalu ingat terhadap cusomer yang hutang di toko anda!
            </Text>
          </View>
          <View flexDirection="row">
            <FontAwesomeIcon name="check" color="green" />
            <Text ml="2" mt="-1" maxW={32}>
              Lakukan penagihan melalui Xendit!
            </Text>
          </View>
        </View>
        <Button
          rounded="3xl"
          h="8"
          bg="blue.400"
          style={{
            marginVertical: 20,
          }}
          onPress={() => {
            navigation.navigate("Hutang");
          }}
        >
          Ke Halaman Hutang
        </Button>
      </Box>
    </>
  );
}
