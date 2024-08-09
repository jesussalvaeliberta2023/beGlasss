import { StatusBar } from 'expo-status-bar';
import styles from '../styles/StyleSheet';
import { View } from 'react-native';
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
  require('../assets/images/Frame.png'),
];

export default function App({ scrollX }) {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <CircularCarousel data={data} />
    </View>
  );
}