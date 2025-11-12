
import { StyleSheet, View, Pressable, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import ProfileImage from '@/modules/profile/components/ProfileImage';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { truncateString } from '@/utils/StringUtils';

interface PostProps {
  username: string;
  date: string;
  text?: string;
  profileImage: any;
  postImage?: string[];
  initialLikes?: number;
  initialComments?: number;
}

const Post: React.FC<PostProps> = ({
  username,
  date,
  profileImage,
  text,
  postImage,
  initialLikes = 0,
  initialComments = 0,
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => console.log('Comment pressed');
  const handleInsight = () => console.log('Insight pressed');

  const hasImage = postImage && postImage.length > 0;
  const hasText = !!text;

  return (
    <View style={styles.container}>
      <View style={styles.postContainer}>
        {/* Profile + connector line */}
        <View style={{ alignItems: 'center' }}>
          <ProfileImage
            source={{uri:profileImage}}
            size={60}
            borderColor={theme.tint}
            borderWidth={3}
          />
          {(hasText || hasImage) && (
            <View
              style={{
                flex: 1,
                width: 1,
                backgroundColor: theme.tint,
                marginTop: 6,
              }}
            />
          )}
        </View>

        {/* Post Content */}
        <View style={{ flex: 1, marginLeft: 10 }}>
          {/* Username and date row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <ThemedText type="subtitle">{truncateString(username)}</ThemedText>
            <ThemedText type="defaultSemiBold">{date}</ThemedText>
            <Pressable>
              <Ionicons name="ellipsis-horizontal" size={24} color={theme.icon} />
            </Pressable>
          </View>

          {/* Text content */}
          {hasText && (
            <View style={{ marginTop: 6 }}>
              <ThemedText type="defaultSemiBold">{text}</ThemedText>
            </View>
          )}

          {/* Images */}
          {hasImage && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: hasText ? 6 : 0 }}
            >
              {postImage.map((imageUrl: string, index: number) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 10,
                    marginRight: 10,
                  }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          )}

          {/* Actions */}
          <View style={[styles.actionsContainer, { marginTop: 15 }]}>
            <Pressable style={styles.action} onPress={handleLike}>
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={24}
                color={liked ? 'red' : theme.icon}
              />
              <ThemedText type="defaultSemiBold">{likes}</ThemedText>
            </Pressable>

            <Pressable style={styles.action} onPress={handleComment}>
              <Ionicons name="chatbubble-outline" size={24} color={theme.icon} />
              <ThemedText type="defaultSemiBold">{initialComments}</ThemedText>
            </Pressable>

            <Pressable style={styles.action} onPress={handleInsight}>
              <Ionicons name="stats-chart-outline" size={24} color={theme.icon} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 10,
  },
  container: {
    borderBottomColor: '#ccc',
    paddingTop: 30,
    paddingBottom: 10,
    borderBottomWidth: 0.4,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 40,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
