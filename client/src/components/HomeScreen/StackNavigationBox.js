import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Text,
  Box,
  View,
  Modal,
  Button,
  Image,
  Link,
  FormControl,
  Radio,
  Icon,
  Input,
} from "native-base";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNewModal } from "../../store/actions";

export default function StackNavigationBox() {
  const dispatch = useDispatch();
  const produkIcon = require("../../assets/img/produk-icon.png");
  const transaksiIcon = require("../../assets/img/transaksi-icon.png");
  const modalIcon = require("../../assets/img/modal-icon.png");

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [pembayaran, setPembayaran] = useState(0);
  const [acc_token, setAcc_token] = useState("");
  const [dataModal, setDataModal] = useState({
    modal: "",
  });
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      setAcc_token(token);
    } catch (err) {
      console.log(err);
    }
  }

  function formHandler(value, fieldName) {
    setDataModal({ ...dataModal, [fieldName]: value });
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        size="lg"
        animationPreset="slide"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Tambah Modal</Modal.Header>
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
                  dispatch(addNewModal(dataModal, "bank"));
                } else if (pembayaran == 2) {
                  dispatch(addNewModal(dataModal, "cash"));
                }
                setModalVisible(false);
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Box
        mt={-75}
        rounded="xl"
        h={125}
        bg="white"
        shadow={4}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        style={{
          paddingHorizontal: 30,
        }}
      >
        <Link
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View alignItems="center">
            <Image
              source={modalIcon}
              alt="icon modal"
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text color="darkBlue.700" fontSize="xs" mt="2">
              Tambah
            </Text>
            <Text color="darkBlue.700" fontSize="xs" mt="-1.5">
              Modal{" "}
            </Text>
          </View>
        </Link>
        <Link onPress={() => navigation.push("TambahProduk")}>
          <View alignItems="center">
            <Image
              source={produkIcon}
              alt="icon produk"
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text color="darkBlue.700" fontSize="xs" mt="2">
              Tambah
            </Text>
            <Text color="darkBlue.700" fontSize="xs" mt="-1.5">
              Produk{" "}
            </Text>
          </View>
        </Link>
        <Link onPress={() => navigation.push("Transaksi")}>
          <View alignItems="center">
            <Image
              source={transaksiIcon}
              alt="icon transaksi"
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text color="darkBlue.700" fontSize="xs" mt="2">
              Catat{" "}
            </Text>
            <Text color="darkBlue.700" fontSize="xs" mt="-1.5">
              Transaksi{" "}
            </Text>
          </View>
        </Link>
      </Box>
    </>
  );
}
