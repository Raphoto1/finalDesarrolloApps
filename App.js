//imports de app
import { SafeAreaView, StyleSheet } from 'react-native';
//imports propios
import Navigator from './src/navigation/navigator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigator/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
