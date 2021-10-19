import React, { useState, useEffect } from "react";
import {
  Input,
  Stack,
  FormControl,
  StatusBar,
  Box,
  Button,
  Icon,
  Radio,
} from "native-base";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { addNewProduct } from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Addnewproduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    productName: "",
    quantity: "",
    unit: "",
    basePrice: "",
    sellPrice: "",
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
    <View bg="muted.100" h="100%" style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Box safeAreaTop bg="blue.400" roundedBottomLeft={40} h={175} />
      <ScrollView style={styles.formContainer}>
        <FormControl>
          <Stack space={5}>
            <Stack>
              <FormControl.Label>Name Produk</FormControl.Label>
              <Input
                onChangeText={(value) => formHandler(value, "productName")}
                variant="underlined"
                p={2}
                placeholder="Produk"
                style={styles.formInput}
              />
            </Stack>
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
              <FormControl.Label>Unit</FormControl.Label>
              <Input
                onChangeText={(value) => formHandler(value, "unit")}
                variant="underlined"
                p={2}
                placeholder="kg"
                style={styles.formInput}
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
            <Stack>
              <View
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mt="2"
              >
                {/* <Text fontSize={16}>Pembayaran : </Text> */}
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
                    colorScheme="red"
                    value="2"
                    icon={<Icon as={<MaterialCommunityIcons name="cash" />} />}
                    my={1}
                  >
                    Hutang
                  </Radio>
                  <Radio
                    _text={{
                      mx: 2,
                    }}
                    size="md"
                    colorScheme="green"
                    value="3"
                    icon={<Icon as={<MaterialCommunityIcons name="cash" />} />}
                    my={1}
                  >
                    Kas
                  </Radio>
                </Radio.Group>
              </View>
            </Stack>
          </Stack>
        </FormControl>
        <Button
          style={{ marginTop: 30 }}
          onPress={() => {
            if (pembayaran == 3) {
              dispatch(addNewProduct(acc_token, productData, "cash"));
            } else if (pembayaran == 2) {
              dispatch(addNewProduct(acc_token, productData, "hutang"));
            } else if (pembayaran == 1) {
              dispatch(addNewProduct(acc_token, productData, "bank"));
            }
            navigation.goBack();
          }}
          w="100%"
          mt="2"
          bg="blue.400"
          _text={{ color: "white" }}
        >
          Tambah
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#E6E6E6",
    borderRadius: 15,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  formInput: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Addnewproduct;
