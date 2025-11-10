import { StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Ionicons } from '@expo/vector-icons';
import Post from '@/modules/post/components/Post'
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
const postsData = [
  {
    id: '1',
    username: 'Douglas Emmanuel',
    date: '27/4/2025',
    text: 'One day I will post my big wins',
    profileImage: require('../../../assets/images/Douglas.jpeg'),
    postImage: require('../../../assets/images/Douglas.jpeg'),
    initialLikes: 120,
    initialComments: 15,
  },
  {
    id: '2',
    username: 'Douglas Emmanuel',
    date: '27/4/2025',
    text: 'One day I will post my big wins',
    profileImage: require('../../../assets/images/Douglas.jpeg'),
    postImage: require('../../../assets/images/Douglas.jpeg'),
    initialLikes: 120,
    initialComments: 15,
  },
  {
    id: '3',
    username: 'Douglas Emmanuel',
    date: '26/4/2025',
    text: 'Loving this new app!',
    profileImage: require('../../../assets/images/Douglas.jpeg'),
    initialLikes: 89,
    initialComments: 7,
  },
  {
    id: '4',
    username: 'Douglas Emmanuel',
    date: '27/4/2025',
    profileImage: require('../../../assets/images/Douglas.jpeg'),
    postImage: require('../../../assets/images/Douglas.jpeg'),
    initialLikes: 120,
    initialComments: 15,
  }
];

const MyPost:React.FC = () => {
   const colorScheme = useColorScheme() || 'light'; 
      const theme = Colors[colorScheme];
  return (
  <View >
 <View
  style={{
   flexDirection:'row' ,
   alignItems:'flex-start' ,
   gap:10

  }}
>
   <Ionicons name="grid-outline" size={28} color={theme.icon} />
  <ThemedText type='subtitle'>Post</ThemedText>
</View>

     <View style={{marginTop:2 , marginBottom:2}}>
       <FlatList
        data={postsData}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post
            username={item.username}
            date={item.date}
            text={item.text}
            profileImage={item.profileImage}
            postImage={item.postImage}
            initialLikes={item.initialLikes}
            initialComments={item.initialComments}
          />
        )}
      />
     </View>
    </View>
  )
}

export default MyPost

const styles = StyleSheet.create({})