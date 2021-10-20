import React, { useState, useEffect } from "react";
import {
  Input,
  FormControl,
  StatusBar,
  Box,
  Button,
  Icon,
  Radio,
  Text,
  View,
  ScrollView,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Collapse,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { addNewProduct } from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Addnewproduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [money, setMoney] = useState(false);
  const [productData, setProductData] = useState({
    productName: "",
    quantity: "",
    unit: "",
    basePrice: "",
    sellPrice: "",
  });
  const info = useSelector((state) => {
    return state.info;
  });

  const [pembayaran, setPembayaran] = useState(0);
  const [acc_token, setAcc_token] = useState("");
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      setAcc_token(token);
    } catch (err) {
      console.log(err);
    }
  }
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
      <Box safeAreaTop bg="blue.400" h={75} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box bg="blue.400" h={75} roundedBottomRight={70} />
        <View
          bg="white"
          rounded="2xl"
          shadow={4}
          mx={30}
          mb={30}
          p="4"
          my={-5}
          style={{
            marginTop: -65,
          }}
        >
          <FormControl>
            <FormControl.Label _text={{ fontSize: 16 }}>
              Nama Produk
            </FormControl.Label>
            <Input
              onChangeText={(value) => formHandler(value, "productName")}
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Nama produk"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <FormControl mt="3">
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
              keyboardType="numeric"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>Unit</FormControl.Label>
            <Input
              onChangeText={(value) => formHandler(value, "unit")}
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Contoh: kg, pcs, dsb."
              bg="white"
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
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>
              Harga Jual
            </FormControl.Label>
            <Input
              onChangeText={(value) => formHandler(value, "sellPrice")}
              type="text"
              height="10"
              size="md"
              rounded="md"
              placeholder="Harga jual produk satuan"
              bg="white"
              keyboardType="numeric"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <Text fontSize={16} mt="2">
            Pembayaran :{" "}
          </Text>
          <View alignItems="center">
            <Radio.Group
              size="lg"
              name="exampleGroup"
              accessibilityLabel="pick a choice"
              flexDirection="row"
              value={pembayaran}
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
                icon={
                  <Icon as={<MaterialCommunityIcons name="cash-remove" />} />
                }
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
            if (
              pembayaran == 0 ||
              !productData.productName ||
              !productData.quantity ||
              !productData.unit ||
              !productData.basePrice ||
              !productData.sellPrice
            ) {
              setShowAlert(true);
            } else if (pembayaran == 3) {
              navigation.goBack();
              dispatch(addNewProduct(productData, "hutang"));
            } else if (pembayaran == 2) {
              if (calculationKas < 0) {
                setMoney(true);
                setShowAlert(true);
              } else {
                navigation.goBack();
                dispatch(addNewProduct(productData, "cash"));
              }
            } else if (pembayaran == 1) {
              if (calculationBank < 0) {
                setMoney(true);
                setShowAlert(true);
              } else {
                navigation.goBack();
                dispatch(addNewProduct(productData, "bank"));
              }
            }
          }}
        >
          Tambah Produk
        </Button>
      </Box>
    </View>
  );
};

export default Addnewproduct;
