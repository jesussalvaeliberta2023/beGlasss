import React from 'react';
import { FlatList, ImageProps } from 'react-native';
import { CircularCarouselListItem, ListItemWidth } from './list-item';
import { useSharedValue } from 'react-native-reanimated';

type CircularCarouselProps = {
  data: ImageProps['source'][];
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({ data, onImageChange }) => {
  const contentOffset = useSharedValue(0);

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
