import { BackButton } from '@/reuseable/BackButton';
import { ThemedText } from '@/components/themed-text';
import RegisterForm from '@/modules/auth/components/RegisterForm';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform,  ScrollView, StyleSheet, Text, View  , useColorScheme } from 'react-native';

import {
  SafeAreaView,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import GlobalToast from '../../reuseable/GlobalToast';
const Register:React.FC = () => {
   const router = useRouter();
  const theme = useColorScheme()
  const [inputValue, setInputValue] = useState<string>('');
 const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
    const [isSecure, setIsSecure] = useState(true)

  const toggleSecure = () => setIsSecure(prev => !prev)
    
  
    const toggleSecureEntry = () => {
      setIsSecure((prev) => !prev)
    }
  
  return (
       <SafeAreaView 
    style={[,{flex:1}]} 
    >
     <KeyboardAvoidingView
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          //  padding: 30,
           marginHorizontal:20,
            marginTop:Platform.OS === 'ios' ? 0: 15
         
        }}
        keyboardShouldPersistTaps="handled"
      >
    <View  style={{  }}>
    
       <BackButton onPress={() => router.back()} />
      <ThemedText type="title" style={{paddingTop:38}}  >Let's</ThemedText>
      <ThemedText type="title" style={{paddingTop:18}}  >Get Started</ThemedText>
      <ThemedText  type='default'  style={{ paddingTop:10}}>please fill the details to create an account. </ThemedText >
       <RegisterForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        isSecure={isSecure}
        toggleSecure={toggleSecure}
      />
       
       
          <ThemedText 
           onPress={() => router.push('/(auth)/login')}
           type='default'
          style={{marginTop:10 ,  textAlign:'center'}}>
            I have an account? <Text style={{color:"green"  ,paddingLeft:5}}>Login</Text></ThemedText>
           <View style={{marginTop:10}}></View>
    </View>
        <View style={{marginTop:10}}></View>
     </ScrollView>
    </KeyboardAvoidingView>
     <GlobalToast />
  </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({})