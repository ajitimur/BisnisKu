import React from 'react'
import {
  Text,
  View,
  Heading,
  Box,
  FormControl,
  Input,
  Button,
  ScrollView,
  Radio,
  Icon
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export default function PengeluaranForm() {
  return (
    <>
      <ScrollView>
        <View
          p="4"
          bg="white"
          roundedBottom="2xl"
          shadow={4}
          mx={30}
          mb={30}
        >
          <FormControl>
            <FormControl.Label _text={{ fontSize: 16 }}>Nominal Pengeluaran</FormControl.Label>
            <Input
              type="text"
              height="12"
              size="md"
              rounded="md"
              placeholder="RpXX.XXX.XXX"
              keyboardType="numeric"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>Deskirpsi</FormControl.Label>
            <Input
              type="text"
              height="12"
              size="md"
              rounded="md"
              placeholder="Contoh: pengeluaran bayar listrik"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="2"
          >
            <Text
              fontSize={16}
            >Pembayaran :{" "}</Text>
            <Radio.Group
              size="lg"
              name="exampleGroup"
              accessibilityLabel="pick a choice"
              flexDirection="row"
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
                size="md"
                colorScheme="green"
                value="2"
                icon={<Icon as={<MaterialCommunityIcons name="cash" />} />}
                my={1}
              >
                Tunai
              </Radio>
            </Radio.Group>
          </View>
        </View>
      </ScrollView>
      <Box
        h={60}
        bg="blue.400"
        w="100%"
      >
        <Button
          bg="darkBlue.600"
          mx={75}
          rounded="full"
          p="3"
          _text={{
            "fontWeight": "bold",
            "fontSize": "md"
          }}
          top={-20}
          shadow={4}
        >
          Simpan Transaksi
        </Button>
      </Box>
    </>
  )
}
