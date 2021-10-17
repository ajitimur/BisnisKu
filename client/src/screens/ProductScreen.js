import React from "react";
import { FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import { View, Box, StatusBar } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { alignContent } from "styled-system";

const Productscreen = () => {
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
            <Text style={{ color: "white", marginLeft: 18 }}>filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3}>
            <Text style={{ color: "white", marginLeft: 18 }}>filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button3}>
            <Text style={{ color: "white", marginLeft: 18 }}>filter</Text>
          </TouchableOpacity>
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
    height: 506,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 5,
    marginTop: 80,
    marginLeft: 30,
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
    height: 51,
    borderRadius: 10,
    backgroundColor: "#E6E6E6",
    flexDirection: "row",
    marginTop: -571,
    marginLeft: 30,
  },
  button3: {
    width: 66,
    height: 24,
    backgroundColor: "#000",
    borderRadius: 15,
    flex: 0.2,
    justifyContent: "center",
    alignContent: "center",
    // marginLeft: 36,
  },
  button5Row: {
    height: 24,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center",
    // marginRight: 25,
    // marginLeft: 25,
    marginTop: 13,
  },
});

export default Productscreen;
