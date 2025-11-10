import { BackButton } from '../../reuseable/BackButton';
import { ThemedText } from '@/components/themed-text';
import LoginForm from '@/modules/auth/components/LoginForm';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalToast from '../../reuseable/GlobalToast';
const Login:React.FC = () => {
    const router = useRouter();
  const [isSecure, setIsSecure] = useState<boolean>(true)
   const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
   const toggleSecure = () => setIsSecure(prev => !prev)

  const toggleSecureEntry = () => {
    setIsSecure((prev) => !prev)
  }
  return (
    <SafeAreaView style={{flex:1 ,marginTop: Platform.OS === 'ios' ? 0 : 50}}>
     <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
           padding: 30,
            marginTop:Platform.OS === 'ios' ? 0: 2
         
        }}
        keyboardShouldPersistTaps="handled"
      >
    <View  style={{  }}>
      {/* <BackButton onPress={() => router.back()} /> */}
        <View style={{marginTop:40}}></View>
    
      <ThemedText type="title" >Welcome Back</ThemedText >
      <ThemedText  type="default" style={{marginTop:15}}>Please enter your email address and password </ThemedText >
     <ThemedText type="default">to log into your account.</ThemedText >
       <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        isSecure={isSecure}
        toggleSecure={toggleSecure}
      />
          <ThemedText 
           onPress={() => router.push('/(auth)/register')}
          style={{marginTop:10 , textAlign:'center'}} type="default">
            Don't have an account? <Text style={{color:"red"}}>Sign Up</Text></ThemedText>
    </View>
     </ScrollView>
    </KeyboardAvoidingView>
    <GlobalToast/>
  </SafeAreaView>
  )
}

export default Login

export const options = {
  headerShown: false,
}