import React from 'react';
import { FlatList, View, ImageProps } from 'react-native';
import { CircularCarouselListItem, ListItemHeight, ListItemWidth } from './list-item';
import { useSharedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

type CircularCarouselProps = {
  data: { image: ImageProps['source']; characteristic: string; icon: ImageProps['source'] }[];
  onImageChange: (image: ImageProps['source']) => void;
  fontFamily?: string
};

const CircularCarousel: React.FC<CircularCarouselProps> = ({ data, onImageChange, fontFamily  }) => {
  const contentOffset = useSharedValue(0);
  const navigation = useNavigation();

  useAnimatedReaction(() => contentOffset.value, (offset) => {
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
      onScroll={(event) => {
        contentOffset.value = event.nativeEvent.contentOffset.y;
      }}
      style={{
        position: 'relative',
        left: '30%',
        paddingTop: 100,
      }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: ListItemWidth / 2,
      }}
      horizontal={false}
      renderItem={({ item, index }) => {
        const onPress = () => {
          navigation.navigate('Drink', { index });
        };
        return (
          <CircularCarouselListItem
            contentOffset={contentOffset}
            imageSrc={item.image}
            index={index}
            onPress={onPress}
            characteristic={item.characteristic}
            iconSrc={item.icon}
            fontFamily={fontFamily} 
          />
        );
      }}
    />
  );
};

export { CircularCarousel };
