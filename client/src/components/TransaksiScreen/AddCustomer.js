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

export default function AddCustomer() {
  const initialRef = useRef(null)
  return (
    <>
      <Modal.Body bg="white">
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>Nama</FormControl.Label>
          <Input
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="Nama customer"
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: '1.5px'
            }}
            ref={initialRef}
          />
        </FormControl>
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>Email</FormControl.Label>
          <Input
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="Email customer"
            bg="white"
            keyboardType="email-address"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: '1.5px'
            }}
            ref={initialRef}
          />
        </FormControl>
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>Nomor Telepon</FormControl.Label>
          <Input
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="Nomor telepon customer"
            bg="white"
            keyboardType="numeric"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: '1.5px'
            }}
            ref={initialRef}
          />
        </FormControl>
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
