import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Input,
  FormControl,
  StatusBar,
  Box,
  Icon,
  Button,
  Radio,
  Heading,
  Text,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Collapse,
} from "native-base";
import "intl";
import "intl/locale-data/jsonp/en";
import { useSelector, useDispatch } from "react-redux";
import { addNewProduct } from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getDetailProduct } from "../store/actions";
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const Beliproduk = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [pembayaran, setPembayaran] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [money, setMoney] = useState(false);

  const detail = useSelector((state) => {
    return state.detail;
  });
  const info = useSelector((state) => {
    return state.info;
  });
  const [productData, setProductData] = useState({
    quantity: "",
    basePrice: "",
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

  useEffect(() => {
    getToken();
  }, []);

  function formHandler(value, fieldName) {
    setProductData({ ...productData, [fieldName]: value });
  }

  return (
    <View bg="muted.100" h="100%">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Box safeAreaTop bg="blue.400" />
      <Box bg="blue.400" h={125} roundedBottomRight={70} />
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
        <View flexDirection="row" justifyContent="center">
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
              fontSize={15}
              color={
                detail.quantity === 0
                  ? "white"
                  : detail.quantity < 10
                  ? "dark.200"
                  : "white"
              }
            >
              {detail.quantity} {detail?.unit?.toUpperCase()}{" "}
            </Text>
          </View>
        </View>
        <View w="100%" mt="3">
          <View flexDirection="row" justifyContent="space-between">
            <Text fontSize={16}>Harga satuan:</Text>
            <Text fontSize={16}>
              {formatter.format(detail?.basePrice)}
              {"  "}
            </Text>
          </View>
          <View flexDirection="row" justifyContent="space-between">
            <Text fontSize={16}>Harga jual satuan:</Text>
            <Text fontSize={16}>
              {formatter.format(detail?.sellPrice)}
              {"  "}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          bg="white"
          rounded="2xl"
          alignItems="center"
          shadow={4}
          mt="1"
          mx={30}
          mb={30}
          p="4"
        >
          <FormControl>
            <FormControl.Label _text={{ fontSize: 16 }}>
              Kuantitas
            </FormControl.Label>
            <Input
              onChangeText={(value) => formHandler(value, "quantity")}
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Banyak produk"
              bg="white"
              keyboardType="numeric"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>
              Harga Satuan
            </FormControl.Label>
            <Input
              onChangeText={(value) => formHandler(value, "basePrice")}
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Harga produk satuan"
              bg="white"
              keyboardType="numeric"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <View
            flexDirection="row"
            justifyContent="space-between"
            w="100%"
            mt="2"
          >
            <Radio.Group
              size="lg"
              name="exampleGroup"
              accessibilityLabel="pick a choice"
              flexDirection="row"
              mx={9}
              onChange={(nextValue) => {
                setPembayaran(nextValue);
              }}
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
              <Radio
                _text={{
                  mx: 2,
                }}
                size="md"
                colorScheme="red"
                value="3"
                icon={<Icon as={<MaterialCommunityIcons name="cash" />} />}
                my={1}
              >
                Hutang
              </Radio>
            </Radio.Group>
          </View>
        </View>
      </ScrollView>
      <Collapse isOpen={showAlert} my={5}>
        <Alert w="100%" status="error">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  {money
                    ? "Balance anda tidak cukup"
                    : "Input Masih ada yang kosong!"}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => {
                  setMoney(false);
                  setShowAlert(false);
                }}
              />
            </HStack>
          </VStack>
        </Alert>
      </Collapse>
      <Box h={60} bg="blue.400" w="100%" position="relative">
        <Button
          bg="darkBlue.600"
          mx={75}
          rounded="full"
          p="3"
          _text={{
            fontWeight: "bold",
            fontSize: "md",
          }}
          top={-20}
          shadow={4}
          onPress={() => {
            let amount = +productData.basePrice * +productData.quantity;
            let calculationKas = +info.balanceKas - amount;
            let calculationBank = +info.balanceBank - amount;
            productData.id = detail.id;
            productData.productName = detail.productName;
            productData.unit = detail.unit;
            productData.sellPrice = detail.sellPrice;
            if (
              pembayaran == 0 ||
              !productData.quantity ||
              !productData.basePrice
            ) {
              setShowAlert(true);
            } else if (pembayaran == 1) {
              if (calculationBank < 0) {
                setMoney(true);
                setShowAlert(true);
              } else {
                navigation.goBack();
                dispatch(addNewProduct(productData, "bank"));
              }
            } else if (pembayaran == 2) {
              if (calculationKas < 0) {
                setMoney(true);
                setShowAlert(true);
              } else {
                navigation.goBack();
                dispatch(addNewProduct(productData, "cash"));
              }
            } else if (pembayaran == 3) {
              navigation.goBack();
              dispatch(addNewProduct(productData, "hutang"));
            }
          }}
        >
          Tambah Stock
        </Button>
      </Box>
    </View>
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
