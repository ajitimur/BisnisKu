import React, { useRef, useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Modal,
  Input,
  FormControl,
  View,
  Text,
  Radio,
  Icon,
  Button,
} from "native-base";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { addNewModal } from "../../store/actions";

export default function AddModal() {
  const dispatch = useDispatch();
  const [dataModal, setDataModal] = useState({
    modal: "",
  });

  const [pembayaran, setPembayaran] = useState(0);

  const [acc_token, setAcc_token] = useState("");
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      setAcc_token(token);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getToken();
  }, []);

  function formHandler(value, fieldName) {
    setDataModal({ ...dataModal, [fieldName]: value });
  }

  const initialRef = useRef(null);
  return (
    <>
      <Modal.Body bg="white">
        <FormControl mt="2">
          <FormControl.Label _text={{ fontSize: 16 }}>
            Nominal Modal
          </FormControl.Label>
          <Input
            onChangeText={(value) => formHandler(value, "modal")}
            type="text"
            height="10"
            size="md"
            rounded="md"
            placeholder="RpXX.XXX.XXX"
            keyboardType="numeric"
            bg="white"
            _focus={{
              borderColor: "darkBlue.600",
              borderWidth: "1.5px",
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
          <Text fontSize={16}>Pembayaran : </Text>
          <Radio.Group
            size="lg"
            name="exampleGroup"
            accessibilityLabel="pick a choice"
            flexDirection="row"
            value={pembayaran}
            onChange={(nextValue) => {
              setPembayaran(nextValue);
            }}
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
              Kas
            </Radio>
          </Radio.Group>
        </View>
      </Modal.Body>
      <Modal.Footer bg="white">
        <Button
          w="100%"
          bg="darkBlue.600"
          _text={{ color: "white" }}
          onPress={() => {
            if (pembayaran == 1) {
              dispatch(addNewModal(acc_token, dataModal, "bank"));
            } else if (pembayaran == 2) {
              dispatch(addNewModal(acc_token, dataModal, "cash"));
            }
            // setModalVisible(false);
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </>
  );
}
