import React, { useState } from "react";
import { FlatList, ImageProps } from "react-native";
import { CircularCarouselListItem, ListItemHeight } from "./ListItem";
import { useSharedValue, useAnimatedReaction, runOnJS } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/StyleSheet";

type CircularCarouselProps = {
  data: {
    image: ImageProps["source"];
    characteristic: string;
    icon: ImageProps["source"];
  }[];
  onImageChange: (image: ImageProps["source"], direction: "up" | "down") => void;
  onReset: () => void;
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({ data, onImageChange, onReset }) => {
  const contentOffset = useSharedValue(0);
  const [prevOffset, setPrevOffset] = useState(0); // Estado para armazenar o valor anterior
  const navigation = useNavigation<any>();

  useAnimatedReaction(
    () => contentOffset.value,
    (offset) => {
      const index = Math.round(offset / ListItemHeight);
      if (data[index]) {
        const direction = offset > prevOffset ? "up" : "down";
        runOnJS(onImageChange)(data[index].image, direction);
        runOnJS(setPrevOffset)(offset);
      }
      
      // Notificar quando o carrossel voltar à posição inicial
      if (Math.round(offset / ListItemHeight) === 0) {
        runOnJS(onReset)();
      }
    }
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      scrollEventThrottle={16}
      onScroll={(event) => { contentOffset.value = event.nativeEvent.contentOffset.y; }}
      style={styles.listPosition}
      contentContainerStyle={styles.conConStyle}
      horizontal={false}
      renderItem={({ item, index }) => {
        const onPress = (id, image) => {
          navigation.navigate('DrinkDetails', { index, id, image } as any);
        };
        
        return (
          <CircularCarouselListItem
            contentOffset={contentOffset}
            imageSrc={item.image}
            index={index}
            onPress={() => onPress(item.id, item.image)}
            characteristic={item.characteristic}
            iconSrc={item.icon}
            
          />
        );
      }}
    />
  );
};

export { CircularCarousel };
