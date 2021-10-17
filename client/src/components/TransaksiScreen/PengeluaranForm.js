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
} from "native-base";

export default function PengeluaranForm() {
  return (
    <>
      <View
        p="4"
        bg="white"
        roundedBottom="2xl"
        shadow={4}
        mx={30}
      >
        <FormControl >
          <Input
            type="text"
            height="12"
            size="md"
            rounded="md"
            placeholder="Lorem ipsum"
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: "1.5px",
            }}
          />
        </FormControl>
        <FormControl mt="3">
          <Input
            type="text"
            height="12"
            size="md"
            rounded="md"
            placeholder="Lorem ipsum"
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: "1.5px",
            }}
          />
        </FormControl>
        <FormControl mt="3">
          <Input
            type="text"
            height="12"
            size="md"
            rounded="md"
            placeholder="Lorem ipsum"
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: "1.5px",
            }}
          />
        </FormControl>
        <FormControl mt="3">
          <Input
            type="text"
            height="12"
            size="md"
            rounded="md"
            placeholder="Lorem ipsum"
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: "1.5px",
            }}
          />
        </FormControl>
      </View>
      <View
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
      >
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
      </View>
    </>
  )
}
