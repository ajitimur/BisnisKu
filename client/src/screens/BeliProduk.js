import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Input,
  Stack,
  FormControl,
  StatusBar,
  Box,
  Icon,
  Button,
  Radio,
  Heading,
  Text
} from "native-base";
import "intl";
import "intl/locale-data/jsonp/en";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getDetailProduct } from "../store/actions";
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const Beliproduk = ({ route }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    quantity: "",
    basePrice: "",
    sellPrice: "",
  });
  const detail = useSelector((state) => {
    return state.detail;
  });
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      dispatch(getDetailProduct(id, token));
    } catch (err) {
      console.log(err);
    }
  }
  const { id } = route.params;
  // console.log(id);
  useEffect(() => {
    getToken();
  }, []);
  // console.log(detail, "<<<<<");
  function formHandler(value, fieldName) {
    setProductData({ ...productData, [fieldName]: value });
  }

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
      <Box
        bg="blue.400"
        h={125}
      />
      <View
        bg="white"
        rounded="2xl"
        alignItems="center"
        shadow={4}
        mx={30}
        mb={30}
        p="4"
        style={{
          marginTop: -67,
        }}
      >
        <View
          flexDirection="row"
          justifyContent="center"
        >
          <Heading fontSize={22}>{detail.productName}</Heading>
          <View
            justifyContent="center"
            alignItems="center"
            bg={
              detail.quantity === 0
                ? "danger.400"
                : detail.quantity < 10
                  ? "yellow.400"
                  : "success.500"
            }
            rounded="full"
            px="2"
          >
            <Text
              size="md"
              color={
                detail.quantity === 0
                  ? "white"
                  : detail.quantity < 10
                    ? "dark.200"
                    : "white"
              }
            >
              {detail.quantity} {detail.unit.toUpperCase()}{" "}
            </Text>
          </View>
        </View>
        <Text>
          Harga modal satuan: {formatter.format(detail.basePrice)}{" "}
        </Text>
        <Text>
          Harga jual satuan: {formatter.format(detail.sellPrice)}{" "}
        </Text>
      </View>
      {/* <View style={styles.productInfo}>
          <View style={styles.info}>
            <Text style={styles.textInfo}>{detail.productName}</Text>
            <Text
              style={[
                {
                  borderStyle: "solid",
                  borderColor: "gray",
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingLeft: 5,
                  paddingRight: 5,
                  marginBottom: 10,
                },
                detail.quantity < 10
                  ? { backgroundColor: "yellow", color: "black" }
                  : detail.quantity === 0
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "green", color: "white" },
              ]}
            >
              {detail.quantity} {detail.unit}
            </Text>
            <Text style={styles.textInfo}>
              Harga satuan {formatter.format(detail.basePrice)}
            </Text>
            <Text style={styles.textInfo}>
              harga jual {formatter.format(detail.sellPrice)}
            </Text>
          </View>
        </View> */}
      {/* <ScrollView style={styles.formContainer}>
        <FormControl>
          <Stack space={5}>
            <Stack>
              <FormControl.Label>Quantitas</FormControl.Label>
              <Input
                onChangeText={(value) => formHandler(value, "quantity")}
                variant="underlined"
                p={2}
                placeholder="20"
                style={styles.formInput}
                keyboardType="numeric"
              />
            </Stack>
            <Stack>
              <FormControl.Label>Harga Satuan</FormControl.Label>
              <Input
                onChangeText={(value) => formHandler(value, "basePrice")}
                variant="underlined"
                p={2}
                placeholder="20.000"
                style={styles.formInput}
                keyboardType="numeric"
              />
            </Stack>
            <Stack>
              <FormControl.Label>Harga Jual Satuan</FormControl.Label>
              <Input
                onChangeText={(value) => formHandler(value, "sellPrice")}
                variant="underlined"
                p={2}
                placeholder="30.000"
                style={styles.formInput}
                keyboardType="numeric"
              />
            </Stack>
          </Stack>
          <Stack>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              mt="2"
            >
              <Text fontSize={16}>Pembayaran : </Text>
              <Radio.Group
                size="lg"
                name="exampleGroup"
                accessibilityLabel="pick a choice"
                flexDirection="row"
              >
                <Radio
                  _text={{
                    mx: 2,
                  }}
                  colorScheme="green"
                  value="1"
                  icon={<Icon as={<MaterialCommunityIcons name="bank" />} />}
                  my={1}
                >
                  Bank
                </Radio>
                <Radio
                  _text={{
                    mx: 2,
                  }}
                  size="md"
                  colorScheme="green"
                  value="2"
                  icon={<Icon as={<MaterialCommunityIcons name="cash" />} />}
                  my={1}
                >
                  Tunai
                </Radio>
              </Radio.Group>
            </View>
          </Stack>
        </FormControl>
        <Button
          style={{ marginTop: 30 }}
          onPress={() => {
            console.log(productData);
          }}
          w="100%"
          mt="2"
          bg="blue.400"
          _text={{ color: "white" }}
        >
          Beli
        </Button>
      </ScrollView>
    </View> */}
    </View >
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 50,
  },
  formInput: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
  },
  productInfo: {
    width: 330,
    height: 140,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: -50,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  info: {
    height: 24,
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    marginTop: 13,
  },
  textInfo: {
    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#5A7081",
    color: "white",
    marginBottom: 10,
  },
});

export default Beliproduk;
