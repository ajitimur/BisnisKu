import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import "intl";
import "intl/locale-data/jsonp/en";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import {
  View,
  StatusBar,
  Box,
  Heading,
  Button,
  Modal,
  ScrollView,
  Text,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Collapse,
  Skeleton,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getHutang, tagihCustomer } from "../store/actions";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const Hutanglist = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [transaksiId, setTransaksiId] = useState(0);
  const [mockLoading, setMockLoading] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);
  const [showAlert, setShowAlert] = useState(false);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const hutang = useSelector((state) => {
    return state.hutang;
  });
  const isLoading = useSelector((state) => {
    return state.isLoading;
  });

  async function getToken(endpoint) {
    try {
      const token = await AsyncStorage.getItem("access_token");
      dispatch(getHutang(token, endpoint));
    } catch (err) {
      console.log(err);
    }
  }
  async function tagihHutang(id) {
    try {
      const token = await AsyncStorage.getItem("access_token");
      dispatch(tagihCustomer(token, id));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getToken("unpaid");
  }, []);

  function renderHutang(item, index) {
    return (
      <Box
        rounded="xl"
        bg="white"
        shadow={4}
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <Heading fontSize={17} py="3">
          {item.Customer.name}
        </Heading>
        <View
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <View flexDirection="row">
            {item.isPaid ? (
              <FontAwesomeIcon name="check" color="green" />
            ) : (
              <FontAwesomeIcon name="times" color="red" />
            )}
            <Text ml="2" mt="-1" maxW={64}>
              Total: {formatter.format(item.amount)}
            </Text>
          </View>
          <Text>PhoneNumber: {item.Customer.phoneNumber}</Text>
          <Text>email: {item.Customer.email}</Text>
          <Text>jatuh tempo: {item.dueDate}</Text>
        </View>
        <Button
          isDisabled={item.isPaid ? true : false}
          rounded="3xl"
          h="8"
          bg="blue.400"
          style={{
            marginVertical: 20,
          }}
          onPress={() => {
            setTransaksiId(item.id);
            setModalVisible(true);
            console.log("tagihhh");
          }}
        >
          Tagih
        </Button>
      </Box>
    );
  }

  function renderLoading(item, index) {
    return (
      <Box
        rounded="xl"
        bg="white"
        shadow={4}
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
        }}
      >
        <View style={{ marginTop: 10, marginLeft: 0, marginBottom: 10 }}>
          <Skeleton variant="text" height={6} width={40} />
        </View>
        <View
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <View flexDirection="row">
            <Skeleton variant="text" height={6} width={165} />
          </View>

          <Skeleton variant="text" my={1} height={6} width={40} />
          <Skeleton variant="text" my={1} height={6} width={40} />
          <Skeleton variant="text" my={1} height={6} width={40} />
        </View>
        <Button
          rounded="3xl"
          h="8"
          bg="blue.400"
          style={{
            marginVertical: 20,
          }}
        >
          Tagih
        </Button>
      </Box>
    );
  }

  return (
    <View bg="muted.100" h="100%">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Box safeAreaTop bg="blue.400" />
      <ScrollView>
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
            <Modal.Header>konfirmasi</Modal.Header>
            <Modal.Footer bg="white">
              <Button
                bg="green.400"
                onPress={() => {
                  tagihHutang(transaksiId);
                  setModalVisible(false);
                  setShowAlert(true);
                }}
              >
                TAGIH
              </Button>
              <Button
                bg="red.400"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                tidak
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
        <Box bg="blue.400" roundedBottomRight={70} h={125} />
        {/*  */}
        <View style={styles.rect2} mx={30}>
          <View style={styles.button5Row}>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => {
                getToken("unpaid");
              }}
            >
              <Text style={{ color: "white", marginLeft: 12 }}>unpaid</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => {
                getToken("paid");
              }}
            >
              <Text style={{ color: "white", marginLeft: 20 }}>paid</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*  */}
        <View mx={30}>
          <View>
            {isLoading ? (
              <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={mockLoading}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => renderLoading(item, index)}
              />
            ) : (
              <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                data={hutang}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => renderHutang(item, index)}
              />
            )}
          </View>
        </View>
      </ScrollView>
      <Collapse isOpen={showAlert}>
        <Alert w="100%" status="success">
          <VStack space={1} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: "coolGray.800",
                  }}
                >
                  Penagihan Berhasil!
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => setShowAlert(false)}
              />
            </HStack>
          </VStack>
        </Alert>
      </Collapse>
    </View>
  );
};

const styles = StyleSheet.create({
  rect2: {
    width: 330,
    height: 60,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: -40,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.5,
    shadowRadius: 0,
  },
  button5Row: {
    height: 24,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    alignContent: "center",
    marginTop: 18,
  },
  button3: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    // width: 66,
    // height: 24,
    backgroundColor: "#5A7081",
    borderRadius: 15,
    flex: 0.2,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Hutanglist;
