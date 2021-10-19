import React, { useState, useRef, useEffect } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
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
  Input
} from "native-base";
import { AddCustomer } from '../';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers } from '../../store/actions/penjualanAction';
import { getAllProduct } from '../../store/actions';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function PenjualanForm() {
  const [addCustomerVisible, setAddCustomerVisible] = useState(false)
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const customers = useSelector((state) => state.customers);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCustomers())
    dispatch(getAllProduct())
  }, []);

  const [produk, setProduk] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const [pembayaran, setPembayaran] = useState("")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // await dispatch(addPengeluaran(inputData, pembayaran))
    } catch (error) {
      console.log(error);
    }
  }

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
          <AddCustomer />
        </Modal.Content>
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          p="4"
          bg="white"
          roundedBottom="2xl"
          shadow={4}
          mx={30}
          mb={30}
        >
          <FormControl>
            <FormControl.Label _text={{ fontSize: 16 }}>Produk</FormControl.Label>
            <Select
              selectedValue={produk}
              minWidth="90%"
              accessibilityLabel="Choose Service"
              placeholder="Pilih produk"
              _selectedItem={{
                _text: {
                  color: "blue.400"
                },
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={(itemValue) => {
                setProduk(itemValue)
                console.log(itemValue);
              }}
            >
              {
                products.map((product) => (
                  <Select.Item label={product.productName} value={product.id} />
                ))
              }
            </Select>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>Customer</FormControl.Label>
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
                    color: "blue.400"
                  },
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => setCustomer(itemValue)}
              >
                {
                  customers.map((customer) => (
                    <Select.Item label={customer.name} value={customer.id} />
                  ))
                }
              </Select>
              <Link
                onPress={() => {
                  setAddCustomerVisible(!addCustomerVisible)
                }}
                isExternal
              >
                <FontAwesomeIcon size={35} color="#005db4" name="plus-square" />
              </Link>
            </View>
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>Kuantitas</FormControl.Label>
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
          <Text
            fontSize={16}
            mt="2"
          >
            Pembayaran :{" "}
          </Text>
          <View
            alignItems="center"
          >
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
                icon={<Icon as={<MaterialCommunityIcons name="cash-remove" />} />}
                my={1}
              >
                Hutang
              </Radio>
            </Radio.Group>
          </View>
        </View>
      </ScrollView>
      <Box
        h={60}
        bg="blue.400"
        w="100%"
        position="relative"
      >
        <Button
          bg="darkBlue.600"
          mx={75}
          rounded="full"
          p="3"
          _text={{
            "fontWeight": "bold",
            "fontSize": "md"
          }}
          top={-20}
          shadow={4}
          onPress={handleSubmit}
        >
          Simpan Transaksi
        </Button>
      </Box>
    </>
  )
}
