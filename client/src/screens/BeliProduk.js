import React, { useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import {
  View,
  Input,
  Stack,
  FormControl,
  StatusBar,
  Box,
  Button,
} from "native-base";

const Beliproduk = () => {
  const [productData, setProductData] = useState({
    quantity: "",
    basePrice: "",
    sellPrice: "",
  });

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
      <Box safeAreaTop bg="blue.400" roundedBottomLeft={40} h={175} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={styles.productInfo}>
          <View style={styles.info}>
            <Text>nama produk</Text>
            <Text>quantity produk</Text>
            <Text>basePrice produk</Text>
            <Text>sellPrice produk</Text>
          </View>
        </View>
        <ScrollView style={styles.formContainer}>
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
      </View>
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
    height: 100,
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
    // flexDirection: "row",
    flex: 1,
    alignItems: "center",
    // justifyContent: "space-evenly",
    alignContent: "center",
    marginTop: 13,
  },
});

export default Beliproduk;
