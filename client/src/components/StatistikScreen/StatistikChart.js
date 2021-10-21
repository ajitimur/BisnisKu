import React, { useState, useEffect } from 'react'
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Heading, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getInfoKeuangan } from '../../store/actions';
import { fetchReportsMonthlyAsync, fetchReportsWeeklyAsync } from '../../store/actions/statistikAction';

export default function StatistikChart() {
  const reportsWeekly = useSelector((state) => state.reportsWeekly)
  const reportsMonthly = useSelector((state) => state.reportsMonthly)

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

  const penjualanGrafik = reportsWeekly?.penjualan?.map(el => {
    let balance = el.penjualan.length - 3
    const result = el.penjualan.slice(0, balance)

    return +result
  })

  const datePenjualanGrafik = reportsWeekly?.penjualan?.map(el => {
    const currDate = new Date(el.date)
    var dd = String(currDate.getDate()).padStart(2, '0');
    var mm = String(currDate.getMonth() + 1).padStart(2, '0');

    const result = dd + '/' + mm
    return result
  })

  const pengeluaranGrafik = reportsWeekly?.bebanBalance?.map(el => {
    let balance = el.HPP.length - 3
    const result = el.HPP.slice(0, balance)

    return +result
  })

  const datePengeluaranGrafik = reportsWeekly?.bebanBalance?.map(el => {
    const currDate = new Date(el.date)
    var dd = String(currDate.getDate()).padStart(2, '0');
    var mm = String(currDate.getMonth() + 1).padStart(2, '0');

    const result = dd + '/' + mm
    return result
  })

  useEffect(() => {
    // console.log(formatDate(new Date()));
    getToken();
  }, []);

  return (
    <>
      <Heading
        mt="5"
        fontSize={22}
      >
        Grafik Penjualan
      </Heading>
      <View
        width="100%"
        bg="white"
        shadow={4}
        mt="2"
        style={{
          borderRadius: 16,
        }}
      >
        <LineChart
          data={{
            labels: datePenjualanGrafik,
            datasets: [
              {
                data: penjualanGrafik ? penjualanGrafik : [0, 0, 0, 0, 0, 0, 0]
              }
            ]
          }}
          withShadow={true}
          width={333} // from react-native
          height={220}
          yAxisLabel="Rp"
          yAxisSuffix="rb"
          verticalLabelRotation={-40}
          xLabelsOffset={15}
          fromZero={true}
          // yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#fff",
            backgroundGradientToOpacity: 0.5,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(22,163,74, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(39,39,42, ${opacity})`,
            propsForDots: {
              r: "4",
            }
          }}
          bezier
          style={{
            borderRadius: 16,
            marginVertical: 8,
          }}
        />
      </View>
      <Heading
        mt="5"
        fontSize={22}
      >
        Grafik Pengeluaran
      </Heading>
      <View
        width="100%"
        bg="white"
        shadow={4}
        mt="2"
        style={{
          borderRadius: 16,
        }}
        mb="5"
      >
        <LineChart
          data={{
            labels: datePengeluaranGrafik,
            datasets: [
              {
                data: pengeluaranGrafik ? pengeluaranGrafik : [0, 0, 0, 0, 0, 0, 0],
              }
            ]
          }}
          withShadow={true}
          width={333} // from react-native
          height={220}
          yAxisLabel="Rp"
          yAxisSuffix="rb"
          verticalLabelRotation={-40}
          xLabelsOffset={15}
          fromZero={true}
          // yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#fff",
            backgroundGradientToOpacity: 0.5,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(225,29,72, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(39,39,42, ${opacity})`,
            propsForDots: {
              r: "4",
            }
          }}
          bezier
          style={{
            borderRadius: 16,
            marginVertical: 8,
          }}
        />
      </View>
    </>
  )
}
