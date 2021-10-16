import React from 'react'
import { CommonActions } from '@react-navigation/native';
import {
  View,
  Text,
  Button
} from 'native-base'

export default function LainnyaScreen({ navigation }) {
  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Text>Lainnya Screen</Text>
      <Button
        onPress={() => navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Login' }
            ],
          })
        )}
      >
        Back To Login
      </Button>
    </View>
  )
}
