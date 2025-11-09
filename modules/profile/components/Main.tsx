import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { Image } from 'expo-image'
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import ProfileImage from './ProfileImage'
const Main:React.FC = () => {
   const colorScheme = useColorScheme() || 'light'; 
    const theme = Colors[colorScheme];
  return (
    <View style={{alignItems:"center" , justifyContent:"center" , marginTop:40 }}>
        <ProfileImage
        source={require('../../../assets/images/Douglas.jpeg')}
        size={120} // you can change the size
        borderColor={theme.tint}
        borderWidth={3}
      />
     <ThemedText type='defaultSemiBold'>Emmanuel Douglas</ThemedText>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
 
})