import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Image , Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import GlobalToast from '@/reuseable/GlobalToast'
import { showToast } from '@/utils/toast'
import { ThemedView } from '@/components/themed-view'
import { useRouter } from 'expo-router'
import InputField from '../../../reuseable/input'
import CustomButton from '../../../reuseable/Button'
import { ThemedText } from '@/components/themed-text'
import Loader from '../../../reuseable/Loader'
import { useColorScheme } from 'react-native'
import { SignupFormData , signupSchema } from '../validation/register_validationSchemas' ;
import { useSignUp } from '@clerk/clerk-expo'
type SignupFormProps = {
  firstName: string
  setFirstName: (text: string) => void
  lastName: string
  setLastName: (text: string) => void
  email: string
  setEmail: (text: string) => void
  password: string
  setPassword: (text: string) => void
  confirmPassword: string
  setConfirmPassword: (text: string) => void
  isSecure: boolean
  toggleSecure: () => void
  onSubmit?: () => void;
}
const RegisterForm:React.FC<SignupFormProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isSecure,
  toggleSecure,
  onSubmit,
}) => {
    const router = useRouter()
  const theme = useColorScheme()
  const [isLoading, setIsLoading] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('')
    const [inputValue, setInputValue] = useState<string>('');
  
    function handleInputValue(phoneNumber: string) {
      setInputValue(phoneNumber);
    }
  
 

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({});


  const { isLoaded, signUp, setActive } = useSignUp()

const handleSignup = async () => {
  if (!isLoaded) return;
  setIsLoading(true);

  const formData: SignupFormData = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };

  // ✅ Validate form
  const validation = signupSchema.safeParse(formData);
  if (!validation.success) {
    const fieldErrors: Partial<Record<keyof SignupFormData, string>> = {};
    validation.error.issues.forEach((err) => {
      if (err.path.length > 0) {
        const key = err.path[0] as keyof SignupFormData;
        fieldErrors[key] = err.message;
      }
    });
    setErrors(fieldErrors);
    showToast.error("Please fix the errors in the form", {
      position: "top",
      duration: 2000,
    });
    setIsLoading(false);
    return;
  }

  setErrors({});

  try {
    // ✅ Create Clerk user
    await signUp.create({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });

    // ✅ Send email verification
    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });

  
    router.replace("/(auth)/email_verification");


    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setInputValue("");

    showToast.success("Verification email sent!", {
      position: "top",
      duration: 1000,
    });
  } catch (err: any) {
    console.error(JSON.stringify(err, null, 2));
    showToast.error(err.message || "An unexpected error occurred.", {
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
          label="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter your first name"
          error={errors?.firstName}
        />
       
        <InputField
          label="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter your last name"
          error={errors?.lastName}
        />

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          error={errors?.email}
        />


        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          isPassword
          isSecure={isSecure}
          toggleSecure={toggleSecure}
          error={errors?.password}
        />

        <InputField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          isPassword
          isSecure={isSecure}
          toggleSecure={toggleSecure}
          error={errors?.confirmPassword}
        />

        <CustomButton
          title="Sign Up"
          size="large"
          width="full"
          onPress={handleSignup}
        />

        <Loader isVisible={isLoading} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterForm

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '500',
    // color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
  
})