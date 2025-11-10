import { StyleSheet, Text, View , FlatList} from 'react-native'
import React from 'react'
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider'
import SearchBar from '@/modules/post/components/SearchBar'
import { useState } from 'react'
import SearchResult from '@/modules/post/components/SearchResult'
const mockUsers = [
  {
    id: '1',
    username: 'Douglas Emmanuel',
    profileImage: require('@/assets/images/Douglas.jpeg'),
  },
  {
    id: '2',
    username: 'Jane Doe',
    profileImage: require('@/assets/images/Douglas.jpeg'),
  },
];
const Search:React.FC = () => {
  const [searchText, setSearchText] = useState('');
    const filteredUsers = mockUsers.filter(user =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <AppSafeAreaProvider>
  <View style={{paddingLeft:10 , paddingRight:10}}>
     <View style={{marginTop:10}}>
      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search something..."
      />
     </View>
      {searchText.trim().length > 0 && (
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <SearchResult
            profileImage={item.profileImage}
            username={item.username}
            onPress={() => console.log(`Tapped on ${item.username}`)}
          />
        )}
      />
      )}
  </View>
  </AppSafeAreaProvider>
  )
}

export default Search

const styles = StyleSheet.create({})