import React, { useRef, useState } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {
  Modal,
  Input,
  FormControl,
  View,
  Text,
  Radio,
  Icon,
  Button
} from "native-base";

export default function AddModal() {
  const initialRef = useRef(null)
  return (
    <>
      <Modal.Body bg="white">
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>Nominal Modal</FormControl.Label>
          <Input
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="RpXX.XXX.XXX"
            keyboardType="numeric"
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: '1.5px'
            }}
            ref={initialRef}
          />
        </FormControl>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt="1"
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
      </Modal.Body>
      <Modal.Footer bg="white">
        <Button
          w="100%"
          bg="darkBlue.600"
          _text={{ color: 'white' }}
          onPress={() => {
            setModalVisible(false)
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </>
  )
}
