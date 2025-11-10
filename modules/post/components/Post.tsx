
import { StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import ProfileImage from '@/modules/profile/components/ProfileImage';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import RoundedImage from './RoundedImage';
import { truncateString } from '@/utils/StringUtils';

interface PostProps {
  username: string;
  date: string;
  text?: string;
  profileImage: any;
  postImage?: any;
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
const containerHeight = postImage && text
  ? 190   
  : postImage
  ? 155   
  : text
  ? 35    
  : 30; 
  return (
   <View style={styles.container}>
     <View style={styles.postContainer}>
      <View style={{ alignItems: 'center' }}>
        <ProfileImage source={profileImage} size={60} borderColor={theme.tint} borderWidth={3} />
        <View
          style={{
            height: containerHeight,
            width: 1,
            backgroundColor: theme.tint,
            marginTop: postImage ? 4 : 0,
          }}
        />
      </View>

      <View style={{ flex: 1, marginLeft: 10 }}>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'space-between' }}>
          <ThemedText type="subtitle">{truncateString(username)}</ThemedText>
          <ThemedText type="defaultSemiBold">{date}</ThemedText>
          <Pressable>
            <Ionicons name="ellipsis-horizontal" size={24} color={theme.icon} />
          </Pressable>
        </View>
       {text && (
         <View style={{ marginTop: 6 }}>
          <ThemedText type="defaultSemiBold">{text}</ThemedText>
        </View>
       )}

       
        {postImage && (
          <View style={{ marginTop: 6 }}>
            <RoundedImage source={postImage} />
          </View>
        )}

       
        <View style={[styles.actionsContainer, { marginTop:15}]}>
          <Pressable style={styles.action} onPress={handleLike}>
            <Ionicons name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? 'red' : theme.icon} />
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
    borderBottomWidth: 0.4, 
  },
  container:{
   borderBottomColor: '#ccc', 
    paddingTop:30,
    paddingBottom:10,
    borderBottomWidth: 0.4
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
