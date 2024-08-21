import { ImageProps, Image } from "expo-image";
import { Dimensions, Pressable } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type CircularCarouselListItemProps = {
  imageSrc: ImageProps["source"];
  index: number;
  contentOffset: Animated.SharedValue<number>;
  onPress: () => void;  // Adicione a propriedade onPress
};

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

// Define the width of the item
export const ListItemWidth = windowWidth / 2;

// Define the height of the item to be larger than its width
export const ListItemHeight = ListItemWidth * 1.5; // Adjust this ratio as needed

const CircularCarouselListItem: React.FC<CircularCarouselListItemProps> = ({
  imageSrc,
  index,
  contentOffset,
  onPress,
}) => {
  const roolStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 2) * ListItemHeight,
      (index - 1) * ListItemHeight,
      index * ListItemHeight,
      (index + 1) * ListItemHeight,
      (index + 2) * ListItemHeight,
    ];

    const translateYOutputRange = [
      0,
      -ListItemHeight / 6,
      -ListItemHeight / 5,
      -ListItemHeight / 6,
      0,
    ];

    const opacityOutputRange = [0.7, 0.9, 1, 0.9, 0.7];

    const scaleOutputRange = [0.8, 0.8, 1, 0.8, 0.8];

    const translateX = interpolate(
      contentOffset.value,
      inputRange,
      translateYOutputRange,
      Extrapolate.EXTEND
    );
    const opacity = interpolate(
      contentOffset.value,
      inputRange,
      opacityOutputRange,
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      contentOffset.value,
      inputRange,
      scaleOutputRange,
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [ { scale }, { translateX: translateX } ],
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          {
            width: ListItemWidth,
            height: ListItemHeight,
            elevation: 5,
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 20,
          },
          roolStyle,
        ]}
      >
        <Image
          source={imageSrc}
          style={{
            flex: 1,
            borderRadius: 20,
          }}
        />
      </Animated.View>
    </Pressable>
  );
};

export { CircularCarouselListItem };

