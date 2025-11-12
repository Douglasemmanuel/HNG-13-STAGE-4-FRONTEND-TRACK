import { StyleSheet, Text, View , FlatList} from 'react-native'
import React, { useEffect } from 'react'
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider'
import SearchBar from '@/modules/post/components/SearchBar'
import { useState } from 'react'
import SearchResult from '@/modules/post/components/SearchResult'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text'

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
   const colorScheme = useColorScheme() || 'light'; 
        const theme = Colors[colorScheme];
  const [search, setSearch] = useState('');
   const [debouncedSearch, setDebouncedSearch] = useState('');
  const userList = useQuery(api.users.searchUsers , {search:debouncedSearch})
   useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 100); 

    return () => {
      clearTimeout(handler); 
    };
  }, [search]);

  return (
    <AppSafeAreaProvider>
  <View style={{paddingLeft:10 , paddingRight:10}}>
     <View style={{marginTop:10}}>
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search something..."
      />
     </View>
      {debouncedSearch.trim().length > 0 && (
      <FlatList
        data={userList}
         ItemSeparatorComponent={()=><View style={{height:StyleSheet.hairlineWidth , backgroundColor:theme.background}}/>}
        keyExtractor={(item) => item._id}
        scrollEnabled={true}
        ListEmptyComponent={()=><ThemedText type='subtitle' style={{textAlign:'center' , marginTop:15}}>No User Found</ThemedText>}
        renderItem={({ item }) => (
          <SearchResult
            profileImage={item.imageUrl}
            username={item.username ?? ''}
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