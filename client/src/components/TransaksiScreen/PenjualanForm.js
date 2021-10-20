import React, { useState, useRef, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Text,
  View,
  Box,
  FormControl,
  Button,
  ScrollView,
  Select,
  CheckIcon,
  Radio,
  Icon,
  Modal,
  Link,
  Input,
  Collapse,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  addPenjualan,
} from "../../store/actions/penjualanAction";
import { addCustomer } from "../../store/actions/penjualanAction";
import { getAllProduct } from "../../store/actions";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PenjualanForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [addCustomerVisible, setAddCustomerVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showDueDate, setShowDueDate] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const { name, email, phoneNumber } = inputData;
  const handleInput = (value, fieldName) => {
    setInputData({ ...inputData, [fieldName]: value });
  };

  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(getAllProduct());
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [produk, setProduk] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [pembayaran, setPembayaran] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (pembayaran === "hutang") {
        const payload = {
          ProductId: produk,
          CustomerId: customer,
          quantity: quantity,
          dueDate: dueDate,
        };

        dispatch(addPenjualan(payload, "piutang"));
      } else {
        const payload = {
          ProductId: produk,
          CustomerId: customer,
          quantity: quantity,
          category: pembayaran,
        };

        dispatch(addPenjualan(payload, "cash"));
      }
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (value) => {
    value === "hutang" ? setShowDueDate(true) : setShowDueDate(false);
  };

  const handleConfirm = (date) => {
    setDueDate(date);

    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <>
      <Modal
        isOpen={addCustomerVisible}
        onClose={() => setAddCustomerVisible(false)}
        size="lg"
        animationPreset="slide"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Tambah Customer</Modal.Header>
          <Modal.Body bg="white">
            <FormControl mt="2">
              <FormControl.Label _text={{ fontSize: 16 }}>
                Nama
              </FormControl.Label>
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
                  borderWidth: "1.5px",
                }}
                ref={initialRef}
              />
            </FormControl>
            <FormControl mt="2">
              <FormControl.Label _text={{ fontSize: 16 }}>
                Email
              </FormControl.Label>
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
                  borderWidth: "1.5px",
                }}
                ref={initialRef}
              />
            </FormControl>
            <FormControl mt="2">
              <FormControl.Label _text={{ fontSize: 16 }}>
                Nomor Telepon
              </FormControl.Label>
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
                  borderWidth: "1.5px",
                }}
                ref={initialRef}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer bg="white">
            <Button
              w="100%"
              bg="darkBlue.600"
              _text={{ color: "white" }}
              onPress={() => {
                dispatch(addCustomer(inputData));
                setAddCustomerVisible(false);
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View p="4" bg="white" roundedBottom="2xl" shadow={4} mx={30} mb={30}>
          <FormControl>
            <FormControl.Label _text={{ fontSize: 16 }}>
              Produk
            </FormControl.Label>
            <Select
              selectedValue={produk}
              minWidth="90%"
              accessibilityLabel="Choose Service"
              placeholder="Pilih produk"
              _selectedItem={{
                _text: {
                  color: "blue.400",
                },
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setProduk(itemValue);
              }}
            >
              {products.map((product) => (
                <Select.Item
                  isDisabled={product.quantity <= 0 ? true : false}
                  label={product.productName}
                  value={product.id}
                  key={product.id.toString()}
                />
              ))}
            </Select>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>
              Customer
            </FormControl.Label>
            <View
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Select
                selectedValue={customer}
                accessibilityLabel="Choose Service"
                minWidth="88%"
                placeholder="Pilih customer"
                _selectedItem={{
                  _text: {
                    color: "blue.400",
                  },
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setCustomer(itemValue)}
              >
                {customers.map((customer) => (
                  <Select.Item
                    label={customer.name}
                    value={customer.id}
                    key={customer.id.toString()}
                  />
                ))}
              </Select>
              <Link
                onPress={() => {
                  setAddCustomerVisible(!addCustomerVisible);
                }}
                isExternal
              >
                <FontAwesomeIcon size={35} color="#005db4" name="plus-square" />
              </Link>
            </View>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>
              Kuantitas
            </FormControl.Label>
            <Input
              onChangeText={(value) => setQuantity(value)}
              value={quantity}
              type="text"
              height="12"
              size="md"
              rounded="md"
              placeholder="Banyak produk terjual"
              keyboardType="numeric"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <Text fontSize={16} mt="2">
            Pembayaran :{" "}
          </Text>
          <View alignItems="center">
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
                value="bank"
                onPress={() => handleClick("bank")}
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
                value="tunai"
                onPress={() => handleClick("tunai")}
                icon={<Icon as={<MaterialCommunityIcons name="cash" />} />}
                my={1}
              >
                Tunai
              </Radio>
              <Radio
                _text={{
                  mx: 2,
                }}
                size="md"
                colorScheme="red"
                value="hutang"
                onPress={() => handleClick("hutang")}
                icon={
                  <Icon as={<MaterialCommunityIcons name="cash-remove" />} />
                }
                my={1}
              >
                Hutang
              </Radio>
            </Radio.Group>
          </View>
          {showDueDate ? (
            <FormControl isDisabled mt="3">
              <FormControl.Label _text={{ fontSize: 16 }}>
                Tanggal
              </FormControl.Label>
              <View
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Input
                  type="text"
                  height="12"
                  size="md"
                  rounded="md"
                  width="88%"
                  placeholder="Tanggal jatuh tempo"
                  keyboardType="numeric"
                  bg="white"
                  _focus={{
                    borderColor: "darkBlue.600",
                    borderWidth: "1.5px",
                  }}
                  value={dueDate}
                />
                <Link onPress={showDatePicker} isExternal>
                  <FontAwesome5Icon
                    size={35}
                    color="#005db4"
                    name="calendar-alt"
                  />
                </Link>
              </View>
            </FormControl>
          ) : null}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </ScrollView>
      <Collapse isOpen={showAlert} my={5}>
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
                  Penjualan berhasil!
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
      <Box h={60} bg="blue.400" w="100%" position="relative">
        <Button
          bg="darkBlue.600"
          mx={75}
          rounded="full"
          p="3"
          _text={{
            fontWeight: "bold",
            fontSize: "md",
          }}
          top={-20}
          shadow={4}
          onPress={handleSubmit}
        >
          Simpan Transaksi
        </Button>
      </Box>
    </>
  );
}
