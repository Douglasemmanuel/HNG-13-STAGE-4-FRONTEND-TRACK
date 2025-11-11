import { Image } from 'expo-image';
import { Platform, StyleSheet ,View ,   Dimensions } from 'react-native';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import Header from '@/modules/home/components/Header';
import AllPosts from '@/modules/home/components/AllPosts';
import AppDetailScrollView from '@/reuseable/AppDetailScrollView';
const { width, height } = Dimensions.get('window');
import { useUserStore } from '@/modules/auth/store/AuthStore';
import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';
export default function HomeScreen() {
 const { user } = useUser();
  const setUser = useUserStore((state) => state.setCurrentUser);
  const scrollHeight = height * 0.75; 
  useEffect(() => {
    if (user) {
      setUser({
        firstName: user.firstName || undefined,
        lastName: user.lastName || undefined,
        email: user.emailAddresses?.[0]?.emailAddress || undefined,
        avatar: user.imageUrl || undefined,
      });

      // console.log('✅ User stored in Zustand:', useUserStore.getState().currentUser);
    }
  }, [user]);


  return (
       <AppSafeAreaProvider>
         <AppDetailScrollView  height={scrollHeight}>
  <View style={{paddingLeft:10 , paddingRight:10}}>
    <Header/>
    <AllPosts/>
  </View>
  </AppDetailScrollView>
  </AppSafeAreaProvider>
  );
}

const styles = StyleSheet.create({

});
