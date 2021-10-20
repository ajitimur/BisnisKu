import React from 'react'
import {
  StatusBar,
  Text,
  Box,
  View,
  ScrollView
} from "native-base";
import {
  MainStatistikCard,
  StatistikChart
} from '../components';

export default function StatistikScreen() {
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
      <Box
        bg="blue.400"
        h={125}
        roundedBottomRight={70}
      >
      </Box>
      <View mx={30}>
        <MainStatistikCard />
        <StatistikChart />
      </View>
    </View>
  )
}
