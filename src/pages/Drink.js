import { View, Text } from "react-native";
import { styles } from "../styles/StyleSheet";
import { useNavigation } from "@react-navigation/native";

export default function Drink() {
  const navigation = useNavigation();
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}>
			<Text style={{ textAlign: 'justify' }}> 
				Hey, that is drink screen!!
      </Text>
    </View>
  );
}