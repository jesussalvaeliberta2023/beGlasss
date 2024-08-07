import { StatusBar } from 'expo-status-bar';
import styles from '../styles/StyleSheet';
import { Text, View } from 'react-native';
import { CircularCarousel } from '../components/circular-carousel';

const data = [
  require('../assets/images/Caipirinha.png'),
  require('../assets/images/MoscowMule.png'),
  require('../assets/images/Sangria.png'),
  require('../assets/images/Margarita.png'),
  require('../assets/images/VirginOnTheBeach.png'),
  require('../assets/images/Mojito.png'),
  require('../assets/images/PinaColada.png'),
  require('../assets/images/BlueHawaiian.png'),
];

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CircularCarousel data={data} />
    </View>
  );
}