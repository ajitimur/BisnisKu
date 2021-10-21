import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  Box,
  View,
  Heading,
  Button,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import "intl";
import "intl/locale-data/jsonp/en";
import { getInfoKeuangan } from "../../store/actions";
import { fetchReportsWeeklyAsync, fetchReportsMonthlyAsync } from "../../store/actions/statistikAction";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function MainStatistikCard() {
  const info = useSelector((state) => state.info)
  const reportsWeekly = useSelector((state) => state.reportsWeekly)
  const reportsMonthly = useSelector((state) => state.reportsMonthly)

  const formatDate = date => {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };

  const dispatch = useDispatch();
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      dispatch(getInfoKeuangan(token));
      dispatch(fetchReportsWeeklyAsync(token));
      dispatch(fetchReportsMonthlyAsync(token));
    } catch (err) {
      console.log(err);
    }
  }

  const [showReports, setShowReports] = useState("today")

  const handleFilter = (value) => {
    if (value === "weekly") {
      setShowReports(value)
    } else if (value === "monthly") {
      setShowReports(value)
    } else {
      setShowReports(value)
    }
  }

  const [penjualan, setPenjualan] = useState(0)
  const [pengeluaran, setPengeluaran] = useState(0)
  const [labaTransaksi, setLabaTransaksi] = useState(0)
  const [hpp, setHpp] = useState(0)
  const [grossProfit, setGrossProfit] = useState(0)

  const [penjualanWeekly, setPenjualanWeekly] = useState(0)
  const [pengeluaranWeekly, setPengeluaranWeekly] = useState(0)
  const [labaTransaksiWeekly, setLabaTransaksiWeekly] = useState(0)
  const [hppWeekly, setHppWeekly] = useState(0)
  const [grossProfitWeekly, setGrossProfitWeekly] = useState(0)

  const [penjualanMonthly, setPenjualanMonthly] = useState(0)
  const [pengeluaranMonthly, setPengeluaranMonthly] = useState(0)
  const [labaTransaksiMonthly, setLabaTransaksiMonthly] = useState(0)
  const [hppMonthly, setHppMonthly] = useState(0)
  const [grossProfitMonthly, setGrossProfitMonthly] = useState(0)

  const today = formatDate(new Date())

  let penjualanByDay = 0
  let pengeluaranByDay = 0
  let hppByDay = 0
  let grossProfitByDay = 0

  let penjualanByWeek = 0
  let pengeluaranByWeek = 0
  let hppByWeek = 0
  let grossProfitByWeek = 0

  let penjualanByMonth = 0
  let pengeluaranByMonth = 0
  let hppByMonth = 0
  let grossProfitByMonth = 0

  reportsWeekly?.penjualan?.forEach(el => {
    penjualanByDay = today === el.date ? el.penjualan : 0
    penjualanByWeek += +el.penjualan
    grossProfitByDay = today === el.date ? el.grossProfit : 0
    grossProfitByWeek += +el.grossProfit
  })
  reportsWeekly?.bebanBalance?.forEach(el => {
    pengeluaranByDay = today === el.date ? el.HPP : 0
    pengeluaranByWeek += +el.HPP
  })
  reportsWeekly?.hppBalance?.forEach(el => {
    hppByDay = today === el.date ? el.HPP : 0
    hppByWeek += +el.HPP
  })

  reportsMonthly?.penjualan?.forEach(el => {
    penjualanByMonth += +el.penjualan
    grossProfitByMonth += +el.grossProfit
  })
  reportsMonthly?.bebanBalance?.forEach(el => pengeluaranByMonth += +el.beban)
  reportsMonthly?.hppBalance?.forEach(el => hppByMonth += +el.HPP)

  const laba = penjualanByDay - pengeluaranByDay
  const labaByWeek = penjualanByWeek - pengeluaranByWeek
  const labaByMonth = penjualanByMonth - pengeluaranByMonth

  useEffect(() => {
    setPenjualan(penjualanByDay)
    setPengeluaran(pengeluaranByDay)
    setLabaTransaksi(laba)
    setHpp(hppByDay)
    setGrossProfit(grossProfitByDay)

    setPenjualanWeekly(penjualanByWeek)
    setPengeluaranWeekly(pengeluaranByWeek)
    setLabaTransaksiWeekly(labaByWeek)
    setHppWeekly(hppByWeek)
    setGrossProfitWeekly(grossProfitByWeek)

    setPenjualanMonthly(penjualanByMonth)
    setPengeluaranMonthly(pengeluaranByMonth)
    setLabaTransaksiMonthly(labaByMonth)
    setHppMonthly(hppByMonth)
    setGrossProfitMonthly(grossProfitByMonth)

    getToken();
  }, []);

  return (
    <>
      <Box
        mt={-65}
        rounded="xl"
        bg="white"
        shadow={4}
        style={{
          padding: 20
        }}
      >
        <View
          mb="2"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="dark.400" fontSize={15}>
            Kas Tunai
          </Text>
          <Text color="green.500" fontSize={15} fontWeight="bold">
            {formatter.format(info.balanceKas)}
          </Text>
        </View>
        <View
          mb="2"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="dark.400" fontSize={15}>
            Kas bank
          </Text>
          <Text color="green.500" fontSize={15} fontWeight="bold">
            {formatter.format(info.balanceBank)}
          </Text>
        </View>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mb="2"
        >
          <Text color="dark.400" fontSize={15}>
            Hutang{" "}
          </Text>
          <Text color="danger.500" fontSize={15} fontWeight="bold">
            {formatter.format(info.balanceHutang)}
          </Text>
        </View>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text color="dark.400" fontSize={15}>
            Piutang{" "}
          </Text>
          <Text color="danger.500" fontSize={15} fontWeight="bold">
            {formatter.format(info.balancePiutang)}
          </Text>
        </View>
      </Box>
      <View
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        mt="3"
      >
        <TouchableOpacity>
          <Text
            bg="darkBlue.600"
            color="white"
            px="4"
            py="1"
            rounded="full"
            onPress={() => handleFilter("today")}
          >
            Hari ini
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            bg="darkBlue.600"
            color="white"
            px="4"
            py="1"
            rounded="full"
            onPress={() => handleFilter("weekly")}
          >
            Minggu ini
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            bg="darkBlue.600"
            color="white"
            px="4"
            py="1"
            rounded="full"
            onPress={() => handleFilter("monthly")}
          >
            Bulan ini
          </Text>
        </TouchableOpacity>
      </View>

      {
        showReports === "today"
          ? (
            <>
              <View
                mt="3"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  bg="white"
                  rounded="xl"
                  shadow={3}
                  w="49%"
                >
                  <View width="100%" p="3">
                    <View mb="3">
                      <Heading fontSize={12} color="dark.500">Total Penjualan</Heading>
                      <Heading mt="1" fontSize={18}>
                        Rp<Heading fontSize={18}>{penjualan}</Heading>
                      </Heading>
                    </View>
                    <Box
                      mt="6"
                      height={2}
                      roundedTop="full"
                      bg="blue.400"
                      mb="-3"
                    />
                  </View>
                </Box>
                <Box
                  bg="white"
                  rounded="xl"
                  shadow={3}
                  w="49%"
                >
                  <View width="100%" p="3">
                    <View mb="3">
                      <Heading fontSize={12} color="dark.500">Total Pengeluaran</Heading>
                      <Heading mt="1" fontSize={18}>
                        Rp<Heading fontSize={18}>{pengeluaran}</Heading>
                      </Heading>
                    </View>
                    <Box
                      mt="6"
                      height={2}
                      roundedTop="full"
                      bg="blue.400"
                      mb="-3"
                    />
                  </View>
                </Box>
              </View>
              <View
                mt="2"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  bg="white"
                  rounded="xl"
                  shadow={3}
                  w="49%"
                >
                  <View width="100%" p="3">
                    <View mb="3">
                      <Heading fontSize={12} color="dark.500">Total Transaksi</Heading>
                      <Heading mt="1" fontSize={18}>
                        Rp<Heading fontSize={18}>{labaTransaksi}</Heading>
                      </Heading>
                    </View>
                    <Box
                      mt="6"
                      height={2}
                      roundedTop="full"
                      bg="blue.400"
                      mb="-3"
                    />
                  </View>
                </Box>
                <Box
                  bg="white"
                  rounded="xl"
                  shadow={3}
                  w="49%"
                >
                  <View width="100%" p="3">
                    <View mb="3">
                      <Heading fontSize={12} color="dark.500">Total HPP</Heading>
                      <Heading mt="1" fontSize={18}>
                        Rp<Heading fontSize={18}>{hpp}</Heading>
                      </Heading>
                    </View>
                    <Box
                      mt="6"
                      height={2}
                      roundedTop="full"
                      bg="blue.400"
                      mb="-3"
                    />
                  </View>
                </Box>
              </View>
              <View
                mt="2"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box
                  bg="white"
                  rounded="xl"
                  shadow={3}
                  w="49%"
                >
                  <View width="100%" p="3">
                    <View mb="3">
                      <Heading fontSize={12} color="dark.500">Total Laba Kotor Usaha</Heading>
                      <Heading mt="1" fontSize={18}>
                        Rp<Heading fontSize={18}>{grossProfit}</Heading>
                      </Heading>
                    </View>
                    <Box
                      mt="6"
                      height={2}
                      roundedTop="full"
                      bg="blue.400"
                      mb="-3"
                    />
                  </View>
                </Box>
              </View>
            </>
          ) : (
            showReports === "weekly"
              ? (
                <>
                  <View
                    mt="3"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total Penjualan</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{penjualanWeekly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total Pengeluaran</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{pengeluaranWeekly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                  </View>
                  <View
                    mt="2"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total Transaksi</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{labaTransaksiWeekly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total HPP</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{hppWeekly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                  </View>
                  <View
                    mt="2"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total Laba Kotor Usaha</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{grossProfitWeekly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                  </View>
                </>
              ) : (
                <>
                  <View
                    mt="3"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total Penjualan</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{penjualanMonthly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total Pengeluaran</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{pengeluaranMonthly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                  </View>
                  <View
                    mt="2"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total Transaksi</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{labaTransaksiMonthly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total HPP</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{hppMonthly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                  </View>
                  <View
                    mt="2"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box
                      bg="white"
                      rounded="xl"
                      shadow={3}
                      w="49%"
                    >
                      <View width="100%" p="3">
                        <View mb="3">
                          <Heading fontSize={12} color="dark.500">Total Laba Kotor Usaha</Heading>
                          <Heading mt="1" fontSize={18}>
                            Rp<Heading fontSize={18}>{grossProfitMonthly}</Heading>
                          </Heading>
                        </View>
                        <Box
                          mt="6"
                          height={2}
                          roundedTop="full"
                          bg="blue.400"
                          mb="-3"
                        />
                      </View>
                    </Box>
                  </View>
                </>
              )
          )
      }
    </>
  )
}
