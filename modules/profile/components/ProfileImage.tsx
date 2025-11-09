// components/ProfileImage.tsx
import React from 'react';
import { Image, StyleSheet, View, ImageSourcePropType } from 'react-native';

interface Props {
  source: ImageSourcePropType; 
  size?: number; 
  borderColor?: string; 
  borderWidth?: number; 
}

const ProfileImage: React.FC<Props> = ({
  source,
  size = 100,
  borderColor = '#fff',
  borderWidth = 2,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ]}
    >
      <Image
        source={source}
        style={{ width: size, height: size, borderRadius: size / 2 }}
      />
    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
