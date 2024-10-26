import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Drinks from "./src/pages/Drinks";
import Coffes from "./src/pages/Coffes";
import Juices from "./src/pages/Juices";
import Favorites from "./src/pages/Favorites";
import Language from "./src/pages/Language";
import DrinkDetails from "./src/pages/DrinkDetails";
import LoginPage from "./src/pages/Login";
import Perfil from "./src/pages/Perfil";
import Perfil2 from "./src/pages/Perfil copy";
import configuracoesPerfil from "./src/pages/configuracoesPerfil";
import SignUp from "./src/pages/SignUp";
import Testes from "./src/pages/Testes";
import DesignDetails from "./src/pages/DesignDetails";
import FavoritesBack from "./src/pages/FavoriteBack";
import EsqueciSenha from "./src/pages/EsqueciSenha";
import ResetPasswordScreen from "./src/pages/ResetPasswordScreen";

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
          name="Favorites"
          component={Favorites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Language"
          component={Language}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrinkDetails"
          component={DrinkDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
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
          name="Perfil2"
          component={Perfil2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="configuracoesPerfil"
          component={configuracoesPerfil}
          options={{ headerShown: false }}
        />
        <Stack.Screen
         name="Testes"
         component={Testes}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="DesignDetails"
         component={DesignDetails}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="FavoritesBack"
         component={FavoritesBack}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="EsqueciSenha"
         component={EsqueciSenha}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="ResetSenha"
         component={ResetPasswordScreen}
         options={{ headerShown: false }}
       />
       
       
       
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
