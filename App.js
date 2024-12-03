import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Drinks from "./src/pages/Drinks";
import Coffes from "./src/pages/Coffes";
import Juices from "./src/pages/Juices";
import Language from "./src/components/LanguageComponent";
import LogIn from "./src/pages/LogIn";
import Perfil from "./src/pages/Perfil";
import SignUp from "./src/pages/SignUp";
import Routes from "./src/pages/Routes";
import Favorites from "./src/pages/Favorites";
import ResetPasswordScreen from "./src/components/ResetPassword";
import DrinkDetails from "./src/pages/DrinkDetails";
import Checks from "./src/pages/Checks"
import DigitsPage from "./src/components/6DigitsPage";
import TrocarSenha from "./src/components/ForgotPassword";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          cardStyle: { backgroundColor: "transparent" },
          animationEnabled: false,
        }}
      >
        <Stack.Screen
          name="Drinks"
          component={Drinks}
          options={{ headerShown: false, unmountOnBlur: true }}
        />
        <Stack.Screen
          name="Coffes"
          component={Coffes}
          options={{ headerShown: false, unmountOnBlur: true }}
        />
        <Stack.Screen
          name="Juices"
          component={Juices}
          options={{ headerShown: false, unmountOnBlur: true }}
        />
        <Stack.Screen
          name="Language"
          component={Language}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
         name="Routes"
         component={Routes}
         options={{ headerShown: false }}
       />
    
       <Stack.Screen
         name="DrinksDetails"
         component={DrinkDetails}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="Favorites"
         component={Favorites}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="TrocarSenha"
         component={TrocarSenha}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="ResetSenha"
         component={ResetPasswordScreen}
         options={{ headerShown: false }}
       />
        
        <Stack.Screen
         name="Checks"
         component={Checks}
         options={{ headerShown: false }}
       />

<Stack.Screen
         name="DigitsPage"
         component={DigitsPage}
         options={{ headerShown: false }}
       />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
