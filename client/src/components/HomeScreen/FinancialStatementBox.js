import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  Box,
  View,
  Heading,
  Button
} from "native-base";

export default function FinancialStatementBox() {
  const navigation = useNavigation()

  return (
    <>
      <Box
        rounded="xl"
        bg="white"
        shadow={4}
        style={{
          paddingHorizontal: 20,
          marginTop: 20
        }}
      >
        <Heading
          fontSize={17}
          py="3"
        >
          Laporan Keuangan{"   "}
        </Heading>
        <View
          mb="3"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            color="dark.400"
            fontSize={15}
          >
            Kas Tunai
          </Text>
          <Text
            color="green.500"
            fontSize={15}
            fontWeight="bold"
          >
            Rp1.000.000
          </Text>
        </View>
        <View
          mb="3"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            color="dark.400"
            fontSize={15}
          >
            Kas bank
          </Text>
          <Text
            color="green.500"
            fontSize={15}
            fontWeight="bold"
          >
            Rp1.000.000
          </Text>
        </View>
        <View
          mb="3"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            color="dark.400"
            fontSize={15}
          >
            Hutang{" "}
          </Text>
          <Text
            color="danger.500"
            fontSize={15}
            fontWeight="bold"
          >
            Rp1.000.000
          </Text>
        </View>
        <Button
          rounded="3xl"
          h="8"
          bg="blue.400"
          style={{
            marginVertical: 20
          }}
          endIcon={
            <FontAwesome5Icon
              size={20}
              name="angle-right"
              color="white"
            />
          }
          onPress={() => navigation.navigate("Statistik")}
        >
          Lihat detail
        </Button>
      </Box>
    </>
  )
}
