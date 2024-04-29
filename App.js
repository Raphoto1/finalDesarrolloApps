//imports de app
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { useFonts } from "expo-font";
//imports propios
import Navigator from "./src/navigation/Navigator";
import { fonts } from "./src/constants/fonts";
import { colors } from "./src/constants/colors";

//nav bar/ send call(main)llama modal seleccionar juego y grupo o jugadores/sessions(program session/search session)/Friends(Invite friends/manage Groups(carrito))

export default function App() {
  const [fontsLoaded, fontError] = useFonts(fonts);

  if (!fontsLoaded || fontError) {
    return null;
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 1,
    flex: 1,
  },
});
