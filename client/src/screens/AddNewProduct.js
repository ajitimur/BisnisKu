import React, { useState } from "react";
import { Input, Stack, FormControl, StatusBar, Box, Button } from "native-base";
import { View, StyleSheet, ScrollView } from "react-native";

const Addnewproduct = () => {
  const [productData, setProductData] = useState({
    productName: "",
    quantity: "",
    unit: "",
    basePrice: "",
    sellPrice: "",
  });

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
