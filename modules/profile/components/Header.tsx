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
import Loader from '@/reuseable/Loader';
import { useState } from 'react';
const Header:React.FC = () => {
  const route = useRouter();
    const colorScheme = useColorScheme() || 'light'; 
  const theme = Colors[colorScheme];
  const [isLoading , setLoading] = useState<boolean>(false)
  const logout =()=>{
    setLoading(true);
     setTimeout(() => setLoading(false), 1000);
    route.push('/(auth)/login')
  }
  return (
    <>
   <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:'center' }}>
     <ThemedText type='defaultSemiBold'>
            emmanueldouglas2121@gmail.com
        </ThemedText>
          <Pressable  onPress={logout}>
            <Ionicons name="log-out-outline" size={ 32} color={theme.icon}  />
          </Pressable>
   </View>
       <Loader isVisible={isLoading} />
       </>
  )
}

export default Header

const styles = StyleSheet.create({})