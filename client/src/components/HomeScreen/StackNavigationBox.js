import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Box, View, Modal, Button, Image, Link } from "native-base";
import { AddModal } from "../";

export default function StackNavigationBox() {
  const produkIcon = require("../../assets/img/produk-icon.png");
  const transaksiIcon = require("../../assets/img/transaksi-icon.png");
  const modalIcon = require("../../assets/img/modal-icon.png");

  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
          <AddModal />
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
