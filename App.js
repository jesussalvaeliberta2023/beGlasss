import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Favorites from './src/pages/Favorites';
import Perfil from './src/pages/Perfil';
import Drink from './src/pages/Drink';
import LoginPage from './src/pages/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name='Favorites' component={Favorites} options={{ headerShown: false }} />
        <Stack.Screen name='Perfil' component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name='Drink' component={Drink} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginPage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}