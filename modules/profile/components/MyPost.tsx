import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import Post from '@/modules/post/components/Post';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { useUserProfile } from '@/hooks/useUserProfile';
import { api } from '@/convex/_generated/api';
import { usePaginatedQuery } from 'convex/react';
import moment from 'moment';
import Loader from '@/reuseable/Loader';

const MyPost: React.FC = () => {
  const { userProfile } = useUserProfile();
  const userId = userProfile?._id;

  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    { userId: userId || userProfile?._id },
    { initialNumItems: 10 }
  );

  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  if (!results) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader isVisible={true}/>
      </View>
    );
  }

  return (
    <View>
      

      <View style={{ marginTop: 2, marginBottom: 2 }}>
        <FlatList
          data={results}
          scrollEnabled={false}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
        <Ionicons name="grid-outline" size={28} color={theme.icon} />
        <ThemedText type="subtitle">Post</ThemedText>
      </View>
          }
           ItemSeparatorComponent={()=><View style={{height:StyleSheet.hairlineWidth , backgroundColor:theme.background}}/>}
          renderItem={({ item }) => (
            <Post
              username={item.creator?.username ?? ''}
              date={moment(item._creationTime).format('DD/MM/YYYY')}
              text={item.content}
              profileImage={item.creator?.imageUrl}
              postImage={item.mediaFiles ?? []}
              initialLikes={item.likeCount}
              initialComments={item.commentCount}
            />
          )}
        />
      </View>
    </View>
  );
};

export default MyPost;

const styles = StyleSheet.create({
 
});
