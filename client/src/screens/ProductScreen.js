import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
  View,
  Box,
  StatusBar,
  Text,
  Button,
  Link,
  FlatList,
  ScrollView,
  Heading
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../store/actions";
import "intl";
import "intl/locale-data/jsonp/en";
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const Productscreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    dispatch(getAllProduct())
  }, []);

  function renderProduct(item) {
    return (
      <View
        bg="white"
        rounded="xl"
        shadow={3}
        flex={1}
        w="48%"
        m="2%"
        alignItems="center"
      >
        <Link
          onPress={() => {
            navigation.navigate("BeliProduk", { id: item.id });
          }}
          isExternal
        >
          <View
            width="100%"
            p="3"
            alignItems="center"
          >
            <View
              mb="3"
              alignItems="center"
            >
              <Heading fontSize={19}>{item.productName}</Heading>
              <Heading fontSize={13}>{formatter.format(item.basePrice)}{" "}</Heading>
            </View>
            <View
              w="100%"
              alignItems="center"
              bg={
                item.quantity === 0
                  ? "danger.400"
                  : item.quantity < 10
                    ? "yellow.400"
                    : "success.500"
              }
              rounded="md"
            >
              <Text
                color={
                  item.quantity === 0
                    ? "white"
                    : item.quantity < 10
                      ? "dark.200"
                      : "white"
                }
                fontWeight="medium"
              >
                {item.quantity} {item.unit.toUpperCase()}{" "}
              </Text>
            </View>
          </View>
        </Link>
      </View>
    );
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
      <View mx={30}>
        <Box
          mt={-75}
          rounded="xl"
          h={125}
          bg="white"
          shadow={4}
          style={{
            paddingHorizontal: 40,
            paddingVertical: 15
          }}
          justifyContent="space-around"
          mb="2"
        >
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TouchableOpacity>
              <Text
                bg="blue.400"
                color="white"
                px="4"
                py="1"
                rounded="full"
              >
                filter 1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                bg="blue.400"
                color="white"
                px="4"
                py="1"
                rounded="full"
              >
                filter 2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                bg="blue.400"
                color="white"
                px="4"
                py="1"
                rounded="full"
              >
                filter 3
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            rounded="lg"
            bg="darkBlue.600"
            onPress={() => {
              navigation.navigate("TambahProduk");
            }}
          >
            Tambah Produk
          </Button>
        </Box>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          mx={25}
          style={{
            marginBottom: 95
          }}
        >
          <FlatList
            data={products}
            renderItem={({ item }) => renderProduct(item)}
            numColumns="2"
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Productscreen;
