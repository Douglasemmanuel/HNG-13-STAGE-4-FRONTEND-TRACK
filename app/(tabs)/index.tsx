import { Image } from 'expo-image';
import { Platform, StyleSheet ,View ,   Dimensions } from 'react-native';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import Header from '@/modules/home/components/Header';
import AllPosts from '@/modules/home/components/AllPosts';
import AppDetailScrollView from '@/reuseable/AppDetailScrollView';
const { width, height } = Dimensions.get('window');
export default function HomeScreen() {
  const scrollHeight = height * 0.75; 
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
