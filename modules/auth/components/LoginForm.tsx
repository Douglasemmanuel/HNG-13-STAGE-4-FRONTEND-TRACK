import { StyleSheet, Text, View ,TouchableWithoutFeedback , Keyboard } from 'react-native'
import React, { useState } from 'react'
import InputField from '@/reuseable/input'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import CustomButton from '@/reuseable/Button'
import Loader from '@/reuseable/Loader'
import GlobalToast from '@/reuseable/GlobalToast'
import { showToast } from  '../../../utils/toast'
import { loginSchema , LoginFormData } from '../validation/login_validationSchemas'
type LoginFormProps = {
  email: string
  setEmail: (text: string) => void
  password: string
  setPassword: (text: string) => void
  isSecure: boolean
  toggleSecure: () => void
  onSubmit?: () => void // optional custom handler
}
const LoginForm:React.FC<LoginFormProps> = ({
     email,
  setEmail,
  password,
  setPassword,
  isSecure,
  toggleSecure,
  onSubmit,
}) => {
    const router = useRouter();
    const [isLoading , setIsLoading] = useState<boolean>(false)
     const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
const handleAuth = async () => {
  if (isLoading) return;
  setIsLoading(true);

  if (!email.trim() || !password.trim()) {
    setIsLoading(false);
    showToast.error("Please enter both email and password", {
      position: "top",
      duration: 1000,
    });
    return;
  }

  // 1. Signup validation & flow
  const formData: LoginFormData = { email, password };

  const validation = loginSchema.safeParse(formData);
  if (!validation.success) {
    setIsLoading(false);

    const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
    validation.error.issues.forEach((err) => {
      if (err.path.length > 0) {
        const key = err.path[0] as keyof LoginFormData;
        fieldErrors[key] = err.message;
      }
    });

    setErrors(fieldErrors);
    showToast.error("Email and Password don't match", {
      position: "top",
      duration: 2000,
    });
    return;
  }

  setErrors({});

  // Simulate signup/login process
  await new Promise((res) => setTimeout(res, 2000));

  setEmail('');
  setPassword('');

  const toastDuration = 1000;
  if (onSubmit) onSubmit();

  showToast.success("Login successfully!", {
    position: "top",
    duration: toastDuration,
  });

  await new Promise((res) => setTimeout(res, toastDuration));

  // Direct routing after login (without biometric)
  setIsLoading(false);
  router.push('/(tabs)');
};

  return (
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ marginTop: 10 }}>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        error={errors.email}
      />

      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        isPassword
        isSecure={isSecure}
        toggleSecure={toggleSecure}
        // footer={
        //   <ThemedText
        //     style={{
        //       textAlign: 'right',
        //       color: 'grey',
        //     }}
        //     onPress={() => router.push('/(auth)/forget_password')}
        //   >
        //     Recover Password
        //   </ThemedText>
        // }
      />

      <CustomButton
        title="Login"
        size="large"
        width="full"
        onPress={handleAuth}
      />
         <Loader isVisible={isLoading} />
       
    </View>
    </TouchableWithoutFeedback>
  )
}

export default LoginForm

const styles = StyleSheet.create({})