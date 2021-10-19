import React from 'react'
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Text, View } from 'native-base';

export default function StatistikChart() {
  const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  return (
    <View
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
          backgroundGradientFrom: "#f5f5f4",
          backgroundGradientTo: "#e7e5e4",
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
