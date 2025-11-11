import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { Image } from 'expo-image'
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { useUserStore } from '@/modules/auth/store/AuthStore'
import ProfileImage from './ProfileImage'
const Main:React.FC = () => {
   const colorScheme = useColorScheme() || 'light'; 
    const theme = Colors[colorScheme];
    const {currentUser} = useUserStore();
   const capitalize = (str: string): string => {
  if (!str) return ''; // handle empty or undefined strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};




  return (
    <View style={{alignItems:"center" , justifyContent:"center" , marginTop:20 }}>
        <ProfileImage
        source={{uri : currentUser.avatar}}
        size={120} 
        borderColor={theme.tint}
        borderWidth={3}
      />
   <ThemedText type="subtitle" style={{ marginTop: 5 }}>
  {capitalize(currentUser.firstName || '')} {capitalize(currentUser.lastName || '')}
</ThemedText>

    </View>
  )
}

export default Main

const styles = StyleSheet.create({
 
})