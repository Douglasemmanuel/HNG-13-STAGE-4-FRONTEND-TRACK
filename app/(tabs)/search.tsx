import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider'
import SearchBar from '@/modules/post/components/SearchBar'
import { useState } from 'react'
const Search:React.FC = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <AppSafeAreaProvider>
  <View style={{paddingLeft:10 , paddingRight:10}}>
     <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search something..."
      />
  </View>
  </AppSafeAreaProvider>
  )
}

export default Search

const styles = StyleSheet.create({})