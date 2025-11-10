
import { Platform, StyleSheet  , View ,Dimensions} from 'react-native';
import { Fonts } from '@/constants/theme';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import Header from '@/modules/profile/components/Header';
import MyPost from '@/modules/profile/components/MyPost';
import Main from '../../modules/profile/components/Main' ;
import AppDetailScrollView from '@/reuseable/AppDetailScrollView';
const { width, height } = Dimensions.get('window');
export default function TabTwoScreen() {
   const scrollHeight = height * 0.85; 
  return (
<AppSafeAreaProvider>
  
  <View style={{paddingLeft:10 , paddingRight:10}}>
     <Header/>
      <AppDetailScrollView  height={scrollHeight}>
     
    <Main/>
    <MyPost/>
     </AppDetailScrollView>
  </View>
 
</AppSafeAreaProvider>
  );
}

const styles = StyleSheet.create({
 
});
