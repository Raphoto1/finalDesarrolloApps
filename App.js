//imports de app
import { SafeAreaView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
//imports propios
import Navigator from './src/navigation/navigator';
import { fonts } from './src/constants/fonts';

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
    width:'100%',
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
