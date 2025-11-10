import { StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import Post from '@/modules/post/components/Post'
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
    username: 'Jane Doe',
    date: '26/4/2025',
    text: 'Loving this new app!',
    profileImage: require('../../../assets/images/Douglas.jpeg'),
    initialLikes: 89,
    initialComments: 7,
  },
];

const AllPost:React.FC = () => {
  return (
  <View >
     <View style={{marginTop:5, marginBottom:5}}>
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

export default AllPost

const styles = StyleSheet.create({})