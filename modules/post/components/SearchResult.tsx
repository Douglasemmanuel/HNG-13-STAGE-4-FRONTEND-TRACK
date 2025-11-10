import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Colors } from '@/constants/theme'; // optional, if you have a theme file
import { useColorScheme } from 'react-native';

interface UserSearchResultProps {
  profileImage: any;
  username: string;
  onPress?: () => void;
}

const SearchResult: React.FC<UserSearchResultProps> = ({
  profileImage,
  username,
  onPress,
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <Pressable onPress={onPress} style={[styles.container]}>
      <Image source={profileImage} style={styles.profileImage} />
      <View style={styles.textContainer}>
        <Text style={[styles.username, { color: theme.text }]} numberOfLines={1}>
          {username}
        </Text>
      </View>
    </Pressable>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    marginTop:15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
});
