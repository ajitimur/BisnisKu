import React, { useState } from 'react'
import {
  Box,
  Center,
  View,
  Button
} from 'native-base';
import {
  Dimensions,
  Animated,
  Pressable,
} from 'react-native';
import {
  PenjualanForm,
  PengeluaranForm
} from '../components';
import { TabView, SceneMap } from 'react-native-tab-view';
const FirstRoute = () => <PenjualanForm />;
const SecondRoute = () => <PengeluaranForm />;

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
});

export default function TransaksiScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Penjualan ' },
    { key: 'second', title: 'Pengeluaran ' }
  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View
        bg="white"
        roundedTop="2xl"
        // shadow={4}
        mx={30}
      >
        <Box
          flexDirection="row"
          bg="muted.200"
          rounded="8"
          m="3"
        >
          {
            props.navigationState.routes.map((route, i) => {
              const opacity = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map((inputIndex) =>
                  inputIndex === i ? 1 : 0.5
                ),
              });
              const color = index === i ? '#fff' : '#a3a3a3';
              let backgroundColor = ""
              if (index === i) {
                if (index === 0) {
                  backgroundColor = "success.500"
                } else {
                  backgroundColor = "danger.500"
                }
              } else {
                backgroundColor = "muted.200"
              }

              return (
                <Box
                  bg={backgroundColor}
                  flex={1}
                  alignItems="center"
                  p="3"
                  rounded="8"
                >
                  <Pressable
                    onPress={() => {
                      console.log(i);
                      setIndex(i);
                    }}>
                    <Animated.Text style={{ color, "fontWeight": "bold" }}>{route.title}</Animated.Text>
                  </Pressable>
                </Box>
              );
            })
          }
        </Box>
      </View>
    );
  };

  return (
    <>
      <Box
        safeAreaTop
        bg="blue.400"
      />
      <Box
        bg="blue.400"
        h={125}
      >
      </Box>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={{
          marginTop: -67,
        }}
      />
      {/* <View
        flex={1}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box
          h={60}
          bg="blue.400"
          w="100%"
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
          >
            Simpan Transaksi
          </Button>
        </Box>
      </View> */}
    </>
  )
}
