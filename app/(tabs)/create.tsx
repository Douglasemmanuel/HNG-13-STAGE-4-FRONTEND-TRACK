import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider'
const Create:React.FC = () => {
  return (
       <AppSafeAreaProvider>
  <View style={{paddingLeft:10 , paddingRight:10}}></View>
  </AppSafeAreaProvider>
  )
}

export default Create

const styles = StyleSheet.create({})