import { ImageProps, Image} from 'expo-image';
import { Text, View } from 'react-native';
import { Dimensions, Pressable } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle,} from 'react-native-reanimated';
import styles from '../../styles/SecondaryPages/List&CarouselStyles';

type CircularCarouselListItemProps = {
  imageSrc: ImageProps['source'];
  index: number;
  contentOffset: Animated.SharedValue<number>;
  onPress: () => void;
  characteristic: string;
  iconSrc: ImageProps['source']
};

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const ListItemWidth = windowWidth / 2;
export const ListItemHeight = ListItemWidth * 1.5; 

const CircularCarouselListItem: React.FC<CircularCarouselListItemProps> = ({
  imageSrc,
  index,
  contentOffset,
  onPress,
  characteristic,
  iconSrc,
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
      <Animated.View style={[styles.animatedView, roolStyle]}>
        <Image
          source={imageSrc}
          style={styles.imageD}
        />
        <View style={styles.overlay}>
          <Text style={[styles.characteristic]}>{characteristic}</Text>
          <Image source={iconSrc} style={styles.icon} />
        </View>
      </Animated.View>
    </Pressable>
  );
};

export { CircularCarouselListItem };