import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { Platform, StyleSheet, View , useColorScheme , Animated  } from 'react-native';
import { OtpInput } from "react-native-otp-entry";
// import { ButtonColors } from '../../utils/utils';
import { router, useRouter } from 'expo-router';
import Loader from '../../reuseable/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState  , useRef} from 'react';
import * as Haptics from 'expo-haptics';
import { useSignUp } from '@clerk/clerk-expo'

const DEFAULT_OTP = "123456";

const Emailverfication:React.FC = () => {
     const { isLoaded, signUp, setActive } = useSignUp()
       const [code, setCode] = React.useState('')

//     const onVerifyPress = async () => {
//     if (!isLoaded) return

//     try {
//       // Use the code the user provided to attempt verification
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({
//         code,
//       })

//       // If verification was completed, set the session to active
//       // and redirect the user
//       if (signUpAttempt.status === 'complete') {
//         await setActive({ session: signUpAttempt.createdSessionId })
//         router.replace('/')
//       } else {
//         // If the status is not complete, check why. User may need to
//         // complete further steps.
//         console.error(JSON.stringify(signUpAttempt, null, 2))
//       }
//     } catch (err) {
//       // See https://clerk.com/docs/custom-flows/error-handling
//       // for more info on error handling
//       console.error(JSON.stringify(err, null, 2))
//     }
//   }
   const theme = useColorScheme()
   const textColor = theme === 'dark' ? '#fff' : '#000';
   const route = useRouter();
   const [loading, setLoading] = useState(false);

   
    // Animated value for shaking
  const shakeAnim = useRef(new Animated.Value(0)).current;

 const shake = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

  // Reset shakeAnim to 0 before starting the animation
  shakeAnim.setValue(0);

  Animated.sequence([
    Animated.timing(shakeAnim, { toValue: 40, duration: 70, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: -40, duration: 70, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: 30, duration: 70, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: -30, duration: 70, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: 20, duration: 70, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: -20, duration: 70, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: 10, duration: 70, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: -10, duration: 70, useNativeDriver: true }),
    Animated.timing(shakeAnim, { toValue: 0, duration: 70, useNativeDriver: true }),
  ]).start();
};


const handleOtpFilled = async (otp: string) => {
  console.log(`OTP entered: ${otp}`);
  setLoading(true);

  try {
    if (!isLoaded) return;

    // ✅ Attempt verification with the code from Clerk email
    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code: otp,
    });

    if (signUpAttempt.status === "complete") {
      await setActive({ session: signUpAttempt.createdSessionId });
      console.log("✅ OTP verified successfully!");
      router.replace("/"); // go to your home or success screen
    } else {
      console.error("⚠️ Verification incomplete:", signUpAttempt);
      // If needed, show a message or shake here
      shake();
    }
  } catch (err) {
    console.error("❌ Verification error:", err);
    shake();
  } finally {
    setLoading(false);
  }
};

  return (
  <SafeAreaView style={{flex:1,marginTop: Platform.OS === 'ios' ? 0 : 50}}>
      <View style={{padding:20 , marginTop:20}}> 
     <ThemedText type='title'>Verify Your Account</ThemedText>
     <ThemedText type='default' style={{marginTop:10}}>Enter the OTP sent to your email  </ThemedText>
     <ThemedText type='default'>verify your identify and continue Securely.</ThemedText>
            <Animated.View style={{ marginTop: 30, transform: [{ translateX: shakeAnim }] }}>
       <OtpInput
  numberOfDigits={6}
  focusColor='blue'
  autoFocus={false}
  hideStick={true}
  placeholder="******"
  blurOnFilled={true}
  disabled={false}
  type="numeric"
  secureTextEntry={false}
  focusStickBlinkingDuration={500}
  onFocus={() => console.log("Focused")}
  onBlur={() => console.log("Blurred")}
  onTextChange={(text) => console.log(text)}
  onFilled={handleOtpFilled}
  textInputProps={{
    accessibilityLabel: "One-Time Password",
  }}
  textProps={{
    accessibilityRole: "text",
    accessibilityLabel: "OTP digit",
    allowFontScaling: false,
  }}
   theme={{
        pinCodeTextStyle: {
          color: textColor,
          fontSize: 18,
          fontWeight: '600',
        },
        placeholderTextStyle: {
          color: textColor,
        },
        containerStyle: {},
        pinCodeContainerStyle: {},
        focusStickStyle: {},
        focusedPinCodeContainerStyle: {},
        filledPinCodeContainerStyle: {},
        disabledPinCodeContainerStyle: {},
      }}

/>
</Animated.View>
      <Loader isVisible={loading}/>
    </View>
  </SafeAreaView>
  )
}

export default Emailverfication;

const styles = StyleSheet.create({})