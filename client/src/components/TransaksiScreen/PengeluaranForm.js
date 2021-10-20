import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Heading,
  Box,
  FormControl,
  Input,
  Button,
  ScrollView,
  Radio,
  Icon,
  Collapse,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { addPengeluaran } from "../../store/actions/pengeluaranAction";
import { useDispatch } from "react-redux";

export default function PengeluaranForm() {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [pembayaran, setPembayaran] = useState("");
  const [inputData, setInputData] = useState({
    amount: 0,
    description: "",
  });

  const { amount, description } = inputData;

  const handleInput = (value, fieldName) => {
    setInputData({ ...inputData, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(addPengeluaran(inputData, pembayaran));
      setShowAlert(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View p="4" bg="white" roundedBottom="2xl" shadow={4} mx={30} mb={30}>
          <FormControl>
            <FormControl.Label _text={{ fontSize: 16 }}>
              Nominal Pengeluaran
            </FormControl.Label>
            <Input
              onChangeText={(value) => handleInput(value, "amount")}
              value={amount}
              type="text"
              height="12"
              size="md"
              rounded="md"
              placeholder="RpXX.XXX.XXX"
              keyboardType="numeric"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label _text={{ fontSize: 16 }}>
              Deskirpsi
            </FormControl.Label>
            <Input
              onChangeText={(value) => handleInput(value, "description")}
              value={description}
              type="text"
              height="12"
              size="md"
              rounded="md"
              placeholder="Contoh: pengeluaran bayar listrik"
              bg="white"
              _focus={{
                borderColor: "darkBlue.600",
                borderWidth: "1.5px",
              }}
            />
          </FormControl>
          <View
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt="2"
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
                value="cash"
                icon={<Icon as={<MaterialCommunityIcons name="cash" />} />}
                my={1}
              >
                Tunai
              </Radio>
            </Radio.Group>
          </View>
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
                  Pengeluaran berhasil!
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
      <Box h={60} bg="blue.400" w="100%">
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
