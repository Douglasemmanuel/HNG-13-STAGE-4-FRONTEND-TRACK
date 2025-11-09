import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
const Allpost:React.FC = () => {
  return (
    <View>
      <ThemedText type='title' >Allpost</ThemedText >
    </View>
  )
}

export default Allpost

const styles = StyleSheet.create({})