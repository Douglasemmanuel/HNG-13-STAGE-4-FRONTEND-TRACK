import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

interface Props {
  source: any; // require or uri
}

const RoundedImage: React.FC<Props> = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image
        source={source}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default RoundedImage;

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: 150,
    borderRadius: 12, 
    overflow: 'hidden', 
    marginTop:5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
