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
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../store/actions/penjualanAction';

export default function AddCustomer() {
  const initialRef = useRef(null)
  const dispatch = useDispatch()
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phoneNumber: ""
  })

  const { name, email, phoneNumber } = inputData

  const handleInput = (value, fieldName) => {
    setInputData({ ...inputData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(addCustomer(inputData))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Modal.Body bg="white">
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>Nama</FormControl.Label>
          <Input
            onChangeText={(value) => handleInput(value, "name")}
            value={name}
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
            onChangeText={(value) => handleInput(value, "email")}
            value={email}
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
            onChangeText={(value) => handleInput(value, "phoneNumber")}
            value={phoneNumber}
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
          onPress={handleSubmit}
        >
          Save
        </Button>
      </Modal.Footer>
    </>
  )
}
