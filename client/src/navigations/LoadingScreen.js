import { Image } from "native-base";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Loadingscreen = () => {
  return (
    <View style={{ backgroundColor: "#60a5fa" }}>
      <Image
        source={{
          uri: "https://ik.imagekit.io/abiraditya/splash_8gWIhq56N.png?updatedAt=1634562030962",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Loadingscreen;
