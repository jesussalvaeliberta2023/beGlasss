import React from "react";
import { FlatList, ImageProps } from "react-native";
import { CircularCarouselListItem, ListItemHeight, ListItemWidth } from "./ListItem";
import { useSharedValue, useAnimatedReaction, runOnJS } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/StyleSheet";

type CircularCarouselProps = {
  data: {
    image: ImageProps["source"];
    characteristic: string;
    icon: ImageProps["source"];
  }[];
  onImageChange: (image: ImageProps["source"]) => void;
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({ data, onImageChange }) => {
  const contentOffset = useSharedValue(0);
  const navigation = useNavigation<any>();

  useAnimatedReaction(
    () => contentOffset.value,
    (offset) => {
      const index = Math.round(offset / ListItemHeight);
      if (data[index]) {
        runOnJS(onImageChange)(data[index].image);
      }
    }
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      scrollEventThrottle={16} // 60fps por 16 milisegundos
      onScroll={(event) => { contentOffset.value = event.nativeEvent.contentOffset.y; }}
      style={styles.listPosition}
      contentContainerStyle={styles.conConStyle}
      horizontal={false}
      renderItem={({ item, index }) => {
        const onPress = () => {
          navigation.navigate('DrinkDetails', { index } as any);
        };
        
        
        return (
          <CircularCarouselListItem
            contentOffset={contentOffset}
            imageSrc={item.image}
            index={index}
            onPress={onPress}
            characteristic={item.characteristic}
            iconSrc={item.icon}
          />
        );
      }}
    />
  );
};

export { CircularCarousel };
