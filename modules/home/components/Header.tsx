import { StyleSheet, Text, View , Pressable } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/themed-view'
import { ThemedText } from '@/components/themed-text'
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import ProfileImage from '../../profile/components/ProfileImage';
import { useRouter } from 'expo-router';
const Header:React.FC = () => {
   const colorScheme = useColorScheme() || 'light'; 
    const theme = Colors[colorScheme];
    const route = useRouter();
  return (
    <View style={{flexDirection:'row'  ,justifyContent:'space-between'}}>
         <ThemedText type='title'>Framez</ThemedText>
       <Pressable onPress={()=>route.push('/(tabs)/explore')}>
         <ProfileImage
        source={require('../../../assets/images/Douglas.jpeg')}
        size={50} // you can change the size
        borderColor={theme.tint}
        borderWidth={3}
      />
    
       </Pressable>
    </View>
  )
}

export  default Header;

const styles = StyleSheet.create({
 
})