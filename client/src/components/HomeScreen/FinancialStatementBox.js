import React, { useEffect } from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Box, View, Heading, Button } from "native-base";
import { useSelector, useDispatch } from "react-redux";
import "intl";
import "intl/locale-data/jsonp/en";
import { getInfoKeuangan } from "../../store/actions";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function FinancialStatementBox() {
  const navigation = useNavigation();
  const info = useSelector((state) => {
    return state.info;
  });
  const dispatch = useDispatch();
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      dispatch(getInfoKeuangan(token));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getToken();
  }, []);
  console.log(info);
  return (
    <>
      <Box
        rounded="xl"
        bg="white"
        shadow={4}
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Heading fontSize={17} py="3">
          Laporan Keuangan{"   "}
        </Heading>
        <View
          mb="3"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="dark.400" fontSize={15}>
            Kas Tunai
          </Text>
          <Text color="green.500" fontSize={15} fontWeight="bold">
            {formatter.format(info.balanceKas)}
          </Text>
        </View>
        <View
          mb="3"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="dark.400" fontSize={15}>
            Kas bank
          </Text>
          <Text color="green.500" fontSize={15} fontWeight="bold">
            {formatter.format(info.balanceBank)}
          </Text>
        </View>
        <View
          mb="3"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="dark.400" fontSize={15}>
            Hutang{" "}
          </Text>
          <Text color="danger.500" fontSize={15} fontWeight="bold">
            {formatter.format(info.balanceHutang)}
          </Text>
        </View>
        <Button
          rounded="3xl"
          h="8"
          bg="blue.400"
          style={{
            marginVertical: 20,
          }}
          endIcon={
            <FontAwesome5Icon size={20} name="angle-right" color="white" />
          }
          onPress={() => navigation.navigate("Statistik")}
        >
          Lihat detail
        </Button>
      </Box>
    </>
  );
}
