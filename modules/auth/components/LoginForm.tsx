import { StyleSheet, Text, View ,TouchableWithoutFeedback , Keyboard } from 'react-native'
import React, { useState } from 'react'
import InputField from '@/reuseable/input'
import { useRouter } from 'expo-router'
import { ThemedText } from '@/components/themed-text'
import CustomButton from '@/reuseable/Button'
import Loader from '@/reuseable/Loader'
import GlobalToast from '@/reuseable/GlobalToast'
import { showToast } from  '../../../utils/toast'
import { TokenStorage } from '@/utils/token_utils'
import { loginSchema , LoginFormData } from '../validation/login_validationSchemas'
import { useSignIn , useUser  } from '@clerk/clerk-expo'
import { useUserStore } from '../store/AuthStore'




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
   const { isLoaded,signIn, setActive } = useSignIn()
  const {user} = useUser()
    const router = useRouter();
    const {  isAuthenticated ,setCurrentUser , currentUser} = useUserStore();
    const [isLoading , setIsLoading] = useState<boolean>(false)
     const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});


const handleAuth = async () => {
  if (!isLoaded) return; // wait until Clerk is ready
  setIsLoading(true);

  // Basic input validation
  if (!email.trim() || !password.trim()) {
    showToast.error("Please enter both email and password", {
      position: "top",
      duration: 1000,
    });
    setIsLoading(false);
    return;
  }

  // Zod schema validation
  const formData: LoginFormData = { email, password };
  const validation = loginSchema.safeParse(formData);

  if (!validation.success) {
    const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
    validation.error.issues.forEach((err) => {
      if (err.path.length > 0) {
        const key = err.path[0] as keyof LoginFormData;
        fieldErrors[key] = err.message;
      }
    });
    setErrors(fieldErrors);
    showToast.error("Invalid email or password format", {
      position: "top",
      duration: 2000,
    });
    setIsLoading(false);
    return;
  }

  setErrors({});

  try {
    // ✅ Clerk sign-in
    const signInAttempt = await signIn.create({
      identifier: email, 
      password,
    });

    if (signInAttempt.status === "complete") {
      await setActive({ session: signInAttempt.createdSessionId });
       
      console.log("✅ Signed in:", signInAttempt);
       console.log("✅ Signed in Details:", signInAttempt.id);
         const clerkUser = user;

        console.log("✅ Clerk user object:", clerkUser);
        useUserStore.getState().setCurrentUser({
    firstName: clerkUser?.firstName || undefined,
    lastName: clerkUser?.lastName || undefined,
    email: clerkUser?.emailAddresses?.[0]?.emailAddress || undefined,
    avatar: clerkUser?.imageUrl || undefined,
  });
  
  console.log("✅ user is in:",currentUser);
      showToast.success("Login successful!", {
        position: "top",
        duration: 1000,
      });

      // Clear form fields
      setEmail("");
      setPassword("");

      // Navigate to main app
      router.replace("/(tabs)");
    } else {
     
      console.error("⚠️ Incomplete sign-in:", signInAttempt);
      showToast.error("Sign-in incomplete. Please check your credentials.", {
        position: "top",
        duration: 2000,
      });
    }
  } catch (err: any) {
    console.error("❌ Clerk sign-in error:", err);
    showToast.error(err.errors?.[0]?.longMessage || "Login failed.", {
      position: "top",
      duration: 2000,
    });
  } finally {
    setIsLoading(false);
  }
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