import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
const Header:React.FC = () => {
  const route = useRouter();
    const colorScheme = useColorScheme() || 'light'; 
  const theme = Colors[colorScheme];
  return (
   <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:'center' }}>
     <ThemedText type='defaultSemiBold'>
            emmanueldouglas2121@gmail.com
        </ThemedText>
          <Pressable  onPress={()=> route.push('/(tabs)/create')}>
            <Ionicons name="add-circle" size={ 32} color={theme.icon}  />
          </Pressable>
   </View>
  )
}

export default Header

const styles = StyleSheet.create({})