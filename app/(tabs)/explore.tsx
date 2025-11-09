
import { Platform, StyleSheet  , View} from 'react-native';
import { Fonts } from '@/constants/theme';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import Header from '@/modules/profile/components/Header';
import Allpost from '@/modules/profile/components/Allpost';
import Main from '../../modules/profile/components/Main' ;
export default function TabTwoScreen() {
  return (
<AppSafeAreaProvider>
  <View style={{paddingLeft:10 , paddingRight:10}}>
      <Header/>
    <Main/>
    <Allpost/>
  </View>
</AppSafeAreaProvider>
  );
}

const styles = StyleSheet.create({
 
});
