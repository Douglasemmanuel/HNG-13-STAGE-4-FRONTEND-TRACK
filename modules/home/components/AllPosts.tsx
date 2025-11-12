import { StyleSheet, Text, View , FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Post from '@/modules/post/components/Post'
import { api } from '@/convex/_generated/api'
import { usePaginatedQuery } from 'convex/react'
import { useState } from 'react'
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

import moment from 'moment'

const AllPost:React.FC = () => {
     const colorScheme = useColorScheme() || 'light'; 
      const theme = Colors[colorScheme];
  const {results , status , loadMore} = usePaginatedQuery(
  api.messages.getThreads,
  {},
  {
    initialNumItems:5,
  }
);
const [refreshing , setRefreshing] = useState(false);
const onLoadMore =()=>{
  loadMore(5);
};
const onRefresh = ()=>{
  setRefreshing(true);
 setTimeout(()=>{
  setRefreshing(false);
 },2000)

}

  return (
  <View >
     <View >
       <FlatList
        data={results}
        scrollEnabled={false}
        keyExtractor={(item) => item._id}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}

        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        ItemSeparatorComponent={()=><View style={{height:StyleSheet.hairlineWidth , backgroundColor:theme.background}}/>}
        renderItem={({ item }) => (
          <Post
            username={item.creator?.username ?? '' }
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
  )
}

export default AllPost

const styles = StyleSheet.create({})