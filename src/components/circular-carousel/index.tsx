import { FlatList, View, ImageProps } from 'react-native';
import { CircularCarouselListItem, ListItemHeight, ListItemWidth } from './list-item';
import { useSharedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated';

type CircularCarouselProps = {
  data: ImageProps['source'][];
  onImageChange: (image: ImageProps['source']) => void;
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({ data, onImageChange  }) => {
  const contentOffset = useSharedValue(0);

  useAnimatedReaction(() => contentOffset.value, (offset) => {
      const index = Math.round(offset / ListItemHeight);
      if (data[index]) {
        runOnJS(onImageChange)(data[index]);
      }
    }
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      scrollEventThrottle={16} // 60fps por 16 milisegundos
      onScroll={(event) => {
        contentOffset.value = event.nativeEvent.contentOffset.y;
      }}
      style={{
        position: 'relative',
        left: '36%',
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: ListItemWidth / 2,
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
