import { View, Text, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function Testes() {
    const navigation = useNavigation();
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{marginBottom: 15}}>Testes</Text>
          <TouchableOpacity style={{marginBottom: 15}} onPress={() => navigation.navigate("Login")}><Text>Ir para Login</Text></TouchableOpacity>
          <TouchableOpacity style={{marginBottom: 15}} onPress={() => navigation.navigate("Perfil")}><Text>Ir para Perfil</Text></TouchableOpacity>
          <TouchableOpacity style={{marginBottom: 15}} onPress={() => navigation.navigate("Perfil2")}><Text>Ir para Perfil2</Text></TouchableOpacity>
          <TouchableOpacity style={{marginBottom: 15}} onPress={() => navigation.navigate("SignUp")}><Text>Ir para Cadastro</Text></TouchableOpacity>
          <Button title="Voltar" onPress={() => navigation.goBack()}  />
      </View>
  );
}