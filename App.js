import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Drinks from './src/pages/Drink';
import Coffes from './src/pages/Coffes';
import Juices from './src/pages/Juices';
import Favorites from './src/pages/Favorites';
import Perfil from './src/pages/Perfil';
import DrinkDetails from './src/pages/DrinkDetails';
import LoginPage from './src/pages/Login';
import SignUp from './src/pages/SignUp'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Drinks' component={Drinks} options={{ headerShown: false }}/>
        <Stack.Screen name='Coffes' component={Coffes} options={{ headerShown: false }} />
        <Stack.Screen name='Juices' component={Juices} options={{ headerShown: false }} />
        <Stack.Screen name='Favorites' component={Favorites} options={{ headerShown: false }} />
        <Stack.Screen name='Perfil' component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name='DrinkDetails' component={DrinkDetails} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}