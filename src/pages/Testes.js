import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
export default function Testes() {
    const navigation = useNavigation();
  return (
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>Testes</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}><Text>Ir para Login</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Perfil")}><Text>Ir para Perfil</Text></TouchableOpacity>
      </View>
  );
}