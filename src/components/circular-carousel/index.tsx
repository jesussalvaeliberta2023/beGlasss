import { ImageProps } from "expo-image";
import { FlatList, View } from "react-native";
import { CircularCarouselListItem, ListItemWidht } from "./list-item";
import { useSharedValue } from "react-native-reanimated";

type CircularCarouselProps = {
  data: ImageProps["source"][];
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({ data }) => {
  const contentOffset = useSharedValue(0);

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      scrollEventThrottle={16} // 60fps por 16 milisegundos
      onScroll={(event) => {
        contentOffset.value = event.nativeEvent.contentOffset.x;
      }}
      style={{
        position: "relative",
        // left: "30%",
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        // paddingLeft: ListItemWidht / 2,
      
      }}
      horizontal={false}
      renderItem={({ item, index }) => {
        return (
          <CircularCarouselListItem
            contentOffset={contentOffset}
            imageSrc={item}
            index={index}
          />
        );
      }}
    />
  );
};

export { CircularCarousel };
