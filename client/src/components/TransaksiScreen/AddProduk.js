import React, { useRef, useState } from 'react'
import {
  Modal,
  Input,
  FormControl,
  Button
} from "native-base";

export default function AddProduk() {
  const initialRef = useRef(null)
  return (
    <>
      <Modal.Body bg="white">
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>Nama Produk</FormControl.Label>
          <Input
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="Contoh: semen, sepatu, dsb."
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: '1.5px'
            }}
            ref={initialRef}
          />
        </FormControl>
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>Kuantitas</FormControl.Label>
          <Input
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="Total produk dijual"
            bg="white"
            keyboardType="numeric"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: '1.5px'
            }}
            ref={initialRef}
          />
        </FormControl>
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>Harga</FormControl.Label>
          <Input
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="RpXX.XXX.XXX"
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
