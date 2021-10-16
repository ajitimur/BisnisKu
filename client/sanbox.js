<Button
  onPress={async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      console.log("Logged out");
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  }}
></Button>