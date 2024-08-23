import { Pressable, Text, Image } from "react-native";

export default function PressComponent({ onPress, source, text, styleP, styleI, styleT }) {
  return (
    <Pressable onPress={onPress} style={styleP}>
      <Image source={source} style={styleI}></Image>
      <Text style={styleT}>{text}</Text>
    </Pressable>
  );
}