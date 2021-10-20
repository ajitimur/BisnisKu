import React, { useState, useEffect } from 'react'
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Text, View } from 'native-base';
import { useDispatch } from 'react-redux';
import { fetchReportsAsync } from '../../store/actions/statistikAction';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StatistikChart() {
  const dispatch = useDispatch();
  async function getToken() {
    try {
      const token = await AsyncStorage.getItem("access_token");
      dispatch(fetchReportsAsync(token));
    } catch (err) {
      console.log(err);
    }
  }

  const formatDate = date => {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  };

  useEffect(() => {
    // console.log(formatDate(new Date()));
    // getToken();
  }, []);

  return (
    <View
      width="100%"
      bg="white"
      shadow={4}
      mt="5"
      style={{
        borderRadius: 16,
      }}
    >
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Juni"],
          datasets: [
            {
              data: [
                1,
                2,
                3,
                4,
                5,
                6
              ]
            }
          ]
        }}
        withShadow={true}
        width={333} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#f1f1f1",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0,93,180, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(39,39,42, ${opacity})`,
          propsForDots: {
            r: "5",
          }
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  )
}
