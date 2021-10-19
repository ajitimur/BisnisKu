import React, { useEffect } from "react";
import { FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { View, Box, StatusBar } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { getAllProduct } from "../store/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "intl";
import "intl/locale-data/jsonp/en";
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const Productscreen = ({ navigation }) => {
  const dispatch = useDispatch();
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      dispatch(getAllProduct(token));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  const products = useSelector((state) => {
    return state.products;
  });
  // console.log(products);
  function renderProduct(item, index) {
    return (
      <TouchableOpacity
        style={[
          {
            width: 145,
            height: 135,
            backgroundColor: "#E6E6E6",
            shadowColor: "rgba(0,0,0,1)",
            shadowOffset: {
              width: 3,
              height: 3,
            },
            elevation: 5,
            shadowOpacity: 0.5,
            shadowRadius: 0,
            borderRadius: 15,
            marginBottom: 10,
          },
          index % 2 == 0
            ? { marginRight: 20, marginLeft: 3 }
            : { marginLeft: 15 },
        ]}
        onPress={() => {
          navigation.navigate("BeliProduk", { id: item.id });
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // alignContent: "space-between",
          }}
        >
          <Text
            style={{
              borderStyle: "solid",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 5,
              paddingRight: 5,
              backgroundColor: "#5A7081",
              color: "white",
              marginBottom: 10,
            }}
          >
            Produk: {item.productName}
          </Text>
          <Text
            style={{
              borderStyle: "solid",
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 2,
              marginBottom: 10,
              backgroundColor: "gray",
              color: "white",
            }}
          >
            Harga: {formatter.format(item.basePrice)}
          </Text>
          <Text
            style={[
              {
                borderStyle: "solid",
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 5,
                paddingLeft: 5,
                paddingRight: 5,
              },
              item.quantity < 10
                ? { backgroundColor: "yellow", color: "black" }
                : item.quantity === 0
                ? { backgroundColor: "red" }
                : { backgroundColor: "green", color: "white" },
            ]}
          >
            {item.quantity} {item.unit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View bg="muted.100" h="100%" style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Box safeAreaTop bg="blue.400" roundedBottomLeft={40} h={155} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => {
            navigation.navigate("TambahProduk");
          }}
        >
          <Text style={{ color: "white", marginLeft: 10 }}>Tambah Produk</Text>
        </TouchableOpacity>
        <View style={styles.scrollArea}>
          <FlatList
            horizontal={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => renderProduct(item, index)}
          ></FlatList>
        </View>
        <View style={styles.rect2}>
          <View style={styles.button5Row}>
            <TouchableOpacity style={styles.button3} onPress={() => {}}>
              <Text style={{ color: "white", marginLeft: 14 }}>filter 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3}>
              <Text style={{ color: "white", marginLeft: 14 }}>filter 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button3}>
              <Text style={{ color: "white", marginLeft: 14 }}>filter 3</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rect: {
    width: 630,
    height: 230,
    backgroundColor: "#6495ed",
    borderRadius: 99,
    marginTop: -130,
  },
  scrollArea: {
    width: 330,
    height: 500,
    borderRadius: 5,
    marginTop: 40,
  },
  button2: {
    width: 145,
    height: 135,
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
    overflow: "visible",
  },
  button: {
    width: 145,
    height: 135,
    backgroundColor: "#E6E6E6",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 0,
    borderRadius: 15,
    marginLeft: 31,
  },
  button2Row: {
    height: 135,
    flexDirection: "row",
    flex: 1,
    marginTop: 60,
  },
  rect2: {
    width: 330,
    height: 100,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: -610,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  button3: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: 66,
    height: 24,
    backgroundColor: "#5A7081",
    borderRadius: 15,
    flex: 0.2,
    justifyContent: "center",
    alignContent: "center",
  },
  button5Row: {
    height: 24,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center",
    marginTop: 13,
  },
  buttonAdd: {
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    position: "absolute",
    width: 120,
    height: 35,
    backgroundColor: "#60a5fa",
    borderRadius: 12,
    flex: 0.2,
    justifyContent: "center",
    alignContent: "center",
    top: -20,
    left: 140,
  },
});

export default Productscreen;
