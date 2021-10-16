import React, { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {
  StatusBar,
  Text,
  Box,
  View,
  Modal,
  Button,
  Image,
  Link,
  Heading,
  ScrollView
} from "native-base";
import { AddModal } from "../components";

export default function HomeScreen({ navigation }) {
  const produkIcon = require("../assets/img/produk-icon.png")
  const transaksiIcon = require("../assets/img/transaksi-icon.png")
  const modalIcon = require("../assets/img/modal-icon.png")

  const [userLogin, setUserLogin] = useState("");

  const [modalVisible, setModalVisible] = useState(false)
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const getData = async () => {
    try {
      const userLogin = await AsyncStorage.getItem("user");
      if (userLogin) {
        setUserLogin(userLogin);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View
      bg="muted.100"
      h="100%"
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Box
        safeAreaTop
        bg="blue.400"
      />
      <ScrollView>
        <Modal
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          size="lg"
          animationPreset="slide"
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
        >
          <Modal.Content bg="blue.400">
            <Modal.CloseButton />
            <Modal.Header>Tambah Modal</Modal.Header>
            <AddModal />
            <Modal.Footer bg="blue.400">
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
          </Modal.Content>
        </Modal>
        <Box
          bg="blue.400"
          roundedBottomLeft={70}
          h={125}
        >
          <View
            mx={30}
            mt={11}
          >
            <Text
              color="dark.200"
              fontWeight="semibold"
              fontSize="lg"
            >
              Hello, {userLogin}
            </Text>
          </View>
        </Box>
        <View mx={30}>
          <Box
            mt={-75}
            rounded="xl"
            h={125}
            bg="white"
            shadow={4} flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            style={{
              paddingHorizontal: 30
            }}
          >
            <Link
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <View alignItems="center">
                <Image
                  source={modalIcon}
                  alt="icon modal"
                  style={{
                    width: 50,
                    height: 50
                  }}
                />
                <Text
                  color="darkBlue.700"
                  fontSize="xs"
                  mt="2"
                >
                  Tambah
                </Text>
                <Text
                  color="darkBlue.700"
                  fontSize="xs"
                  mt="-1.5"
                >
                  Modal{" "}
                </Text>
              </View>
            </Link>
            <View alignItems="center">
              <Image
                source={produkIcon}
                alt="icon produk"
                style={{
                  width: 50,
                  height: 50
                }}
              />
              <Text
                color="darkBlue.700"
                fontSize="xs"
                mt="2"
              >
                Tambah
              </Text>
              <Text
                color="darkBlue.700"
                fontSize="xs"
                mt="-1.5"
              >
                Produk{" "}
              </Text>
            </View>
            <View alignItems="center">
              <Image
                source={transaksiIcon}
                alt="icon transaksi"
                style={{
                  width: 50,
                  height: 50
                }}
              />
              <Text
                color="darkBlue.700"
                fontSize="xs"
                mt="2"
              >
                Catat{" "}
              </Text>
              <Text
                color="darkBlue.700"
                fontSize="xs"
                mt="-1.5"
              >
                Transaksi{" "}
              </Text>
            </View>
          </Box>
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
          </Box>
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
              Catat Transaksi Keuangan Anda
            </Heading>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <View
                flexDirection="row"
              >
                <FontAwesomeIcon
                  name="check"
                  color="green"
                />
                <Text
                  ml="2"
                  mt="-1"
                  maxW={32}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec
                </Text>
              </View>
              <View
                flexDirection="row"
              >
                <FontAwesomeIcon
                  name="check"
                  color="green"
                />
                <Text
                  ml="2"
                  mt="-1"
                  maxW={32}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec
                </Text>
              </View>
            </View>
            <Button
              rounded="3xl"
              h="8"
              bg="blue.400"
              style={{
                marginVertical: 20
              }}
            >
              Catat Transaksi
            </Button>
          </Box>
          <Box
            rounded="xl"
            bg="white"
            shadow={4}
            style={{
              paddingHorizontal: 20,
              marginTop: 20,
              marginBottom: 95
            }}
          >
            <Heading
              fontSize={17}
              py="3"
            >
              Lorem Ipsum Dolor Sit
            </Heading>
            <View
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <View
                flexDirection="row"
              >
                <FontAwesomeIcon
                  name="check"
                  color="green"
                />
                <Text
                  ml="2"
                  mt="-1"
                  maxW={32}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec
                </Text>
              </View>
              <View
                flexDirection="row"
              >
                <FontAwesomeIcon
                  name="check"
                  color="green"
                />
                <Text
                  ml="2"
                  mt="-1"
                  maxW={32}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nec
                </Text>
              </View>
            </View>
            <Button
              rounded="3xl"
              h="8"
              bg="blue.400"
              style={{
                marginVertical: 20
              }}
            >
              Lorem Ipsum
            </Button>
          </Box>
        </View >
      </ScrollView>
    </View >
  );
}
