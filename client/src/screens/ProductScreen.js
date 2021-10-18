import React from "react";
import { FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { View, Box, StatusBar } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { alignContent } from "styled-system";

const Productscreen = ({ navigation }) => {
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
            // marginLeft: 31,
          },
          index % 2 == 0 ? { marginRight: 20 } : { marginLeft: 15 },
        ]}
        onPress={() => {
          navigation.navigate("BeliProduk");
          console.log("ini di pencet");
        }}
      >
        <Text>{item.name}</Text>
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
      <Box safeAreaTop bg="blue.400" roundedBottomLeft={40} h={175} />
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
            data={[
              { id: 1, name: "produk satu" },
              { id: 2, name: "produk dua" },
              { id: 3, name: "produk tiga" },
              { id: 4, name: "produk tiga" },
              { id: 5, name: "produk tiga" },
              { id: 12, name: "produk satu" },
              { id: 22, name: "produk dua" },
              { id: 32, name: "produk tiga" },
              { id: 42, name: "produk tiga" },
              { id: 52, name: "produk tiga" },
            ]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => renderProduct(item, index)}
          ></FlatList>
        </View>
        <View style={styles.rect2}>
          <View style={styles.button5Row}>
            <TouchableOpacity style={styles.button3}>
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
    // alignItems: "center",
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
    height: 600,
    // backgroundColor: "#E6E6E6",
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
    marginTop: -720,
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
    top: -30,
    left: 140,
  },
});

export default Productscreen;
