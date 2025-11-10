import { StyleSheet, Text, View  ,  TouchableWithoutFeedback,
  Keyboard} from 'react-native'
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
    // Simulate an async API call to check if email exists
const checkIfUserExists = async (email: string): Promise<boolean> => {
  // Simulate email check delay
  await new Promise((r) => setTimeout(r, 500));
  
  // Let's say this email already exists (for demo)
  const existingEmails = ["emmanueldouglas2@gmail.com", "already@taken.com"];
  return existingEmails.includes(email.toLowerCase());
};

const handleSignup =  async() => {
  if (isLoading) return;
  setIsLoading(true);


  const formData: SignupFormData = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };

  const validation = signupSchema.safeParse(formData);

  if (!validation.success) {
    setIsLoading(false);

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
     const userExists = await checkIfUserExists(email);
  if (userExists) {
    setIsLoading(false);
    showToast.info("A user with this email already exists.", {
  position: "top",
  duration: 2000,
});

    return;
  }

    return;
  }

  setErrors({});

  setTimeout(() => {
    
    setIsLoading(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setInputValue('');
    if (onSubmit) onSubmit();

    else router.push('/(auth)/login');
    showToast.success("Account created successfully!",{
  position: "top",
  duration: 1000,
    });

  }, 4000);
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