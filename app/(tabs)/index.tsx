import { Image } from 'expo-image';
import { Platform, StyleSheet ,View } from 'react-native';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import Header from '@/modules/home/components/Header';
export default function HomeScreen() {
  return (
       <AppSafeAreaProvider>
  <View style={{paddingLeft:10 , paddingRight:10}}>
    <Header/>
  </View>
  </AppSafeAreaProvider>
  );
}

const styles = StyleSheet.create({

});
