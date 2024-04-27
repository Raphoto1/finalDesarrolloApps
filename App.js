//imports de app
import { SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
//imports propios
import Navigator from './src/navigation/navigator';
import { fonts } from './src/constants/fonts';
import { colors } from './src/constants/colors';

export default function App() {

  const [fontsLoaded, fontError] = useFonts(fonts);

  if (!fontsLoaded || fontError) {
    return null
  }

  if (fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Navigator/>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.teal200,
  },
});
