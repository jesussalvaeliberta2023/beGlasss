import { ImageProps } from "expo-image";
import { FlatList, View } from "react-native";
import { CircularCarouselListItem } from "./list-item";

type CircularCarouselProps = {
  data: ImageProps["source"][];
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      style={{
        position: 'relative',
        left: "35%",
      }}
      horizontal={false}
      renderItem={({ item, index }) => {
        return <CircularCarouselListItem imageSrc={item} index={index} />;
      }}
    />
  );
};

export { CircularCarousel };
