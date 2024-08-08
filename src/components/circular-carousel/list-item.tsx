import { ImageProps, Image } from "expo-image";
import { Dimensions, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type CircularCarouselListProps = {
  imageSrc: ImageProps["source"];
  index: number;
  contentOffset: Animated.SharedValue<number>;
};

const { width: windowWidth } = Dimensions.get("window");
// const { height: windowHeight } = Dimensions.get("window");

export const ListItemWidht = windowWidth / 2 ;
// export const ListItemWidhht = { windowWidth / 3, windowHeight / 2 }

const CircularCarouselListItem: React.FC<CircularCarouselListProps> = ({
  imageSrc,
  index,
  contentOffset,
}) => {
  const roolStyle = useAnimatedStyle(() => {
    const inputRange = [
      index * ListItemWidht,
      (index + 1) * ListItemWidht,
      (index + 2) * ListItemWidht,
    ];

    const outoutRange = [
      0,
      -ListItemWidht / 3,
      -ListItemWidht / 2,
      -ListItemWidht / 3,
      0,
    ];

    const translateX = interpolate(
      contentOffset.value,
      inputRange,
      outoutRange,
      Extrapolation.EXTEND
    );

    return {
      transform: [
        {
          translateX: translateX,
        },
        {
          translateY: ListItemWidht / 2 + ListItemWidht,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: ListItemWidht,
          aspectRatio: 1,
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
  );
};

export { CircularCarouselListItem };
