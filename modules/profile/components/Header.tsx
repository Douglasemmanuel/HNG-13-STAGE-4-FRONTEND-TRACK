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
import { TokenStorage } from '@/utils/token_utils';
import { useState } from 'react';
import { useAuth , useUser } from '@clerk/clerk-expo';
import { useUserStore } from '@/modules/auth/store/AuthStore';
const Header:React.FC = () => {
  const router = useRouter();
    const colorScheme = useColorScheme() || 'light'; 
  const theme = Colors[colorScheme];
    const { clearCurrentUser , currentUser} = useUserStore();
    const {signOut} = useAuth();
    const {user} = useUser()
  const [isLoading , setLoading] = useState<boolean>(false)
const logout = async () => {
  setLoading(true);
  await signOut();
  await TokenStorage.clearToken();
  clearCurrentUser();
  setTimeout(() => {
    setLoading(false);
    router.replace("/(auth)/login");
  }, 2000);
};

  return (
    <>
   <View style={{flexDirection:"row" , justifyContent:"space-between" , alignItems:'center' }}>
     <ThemedText type='defaultSemiBold'>
            {currentUser.email} 
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