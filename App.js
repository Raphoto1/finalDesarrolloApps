//imports de app
import { SafeAreaView, StyleSheet, Platform, StatusBar,Alert } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
//imports propios
import Navigator from "./src/navigation/Navigator";
import { fonts } from "./src/constants/fonts";
import { colors } from "./src/constants/colors";
import Store from "./src/Store";
import { init } from "./src/db";
// date https://github.com/henninghall/react-native-date-picker
(async () => {
  try {
    const response = await init();
  } catch (error) {
    Alert.alert("error on sql", "restart app", [
      {
        text: "Ok",
      },
    ]);
  }
})()

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fonts);

  if (!fontsLoaded || fontError) {
    return null;
  }

  if (fontsLoaded && !fontError) {
    return (
      <Provider store={Store}>
        <SafeAreaView style={styles.container}>
          <Navigator />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});
