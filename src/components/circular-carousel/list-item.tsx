import { ImageProps, Image } from 'expo-image';
import { Dimensions, View } from 'react-native';

type CircularCarouselListProps = {
  imageSrc: ImageProps['source'];
  index: number;
};

const { width: windowWidth } = Dimensions.get('window');

const ListItemWidht = windowWidth / 3;

const CircularCarouselListItem: React.FC<CircularCarouselListProps> = ({
  imageSrc,
  index,
}) => {
  return (
    <View
      style={{
        marginBottom: 40,
        width: "58%",
        height: 332,
        backgroundColor: '#00000000',
      }}
    >
        <Image
            source={imageSrc}
            style={{
                flex: 1,
                borderRadius: 20,
            }}
        />
    </View>
  );
};

export { CircularCarouselListItem };
