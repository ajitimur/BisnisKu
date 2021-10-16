import React, { useRef, useState } from 'react'
import {
  Modal,
  Input,
  FormControl,
  View,
  Text,
  Radio
} from "native-base";

export default function AddModal() {
  const initialRef = useRef(null)
  const [value, setValue] = useState("")
  return (
    <>
      <Modal.Body>
        <View
          flexDirection="row"
          alignItems="center"
          mb="3"
        >
          <Text>Tipe kas: </Text>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="Tipe kas"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue)
            }}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            colorScheme="darkBlue"
          >
            <Radio value="one" my={1}>
              One
            </Radio>
            <Radio value="two" my={1}>
              Two
            </Radio>
          </Radio.Group>
        </View>
        <FormControl>
          <Input
            borderWidth={0}
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="Nominal modal"
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: '1.5px'
            }}
            ref={initialRef}
          />
        </FormControl>
      </Modal.Body>
    </>
  )
}
