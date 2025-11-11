import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserStore } from '@/modules/auth/store/AuthStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
// import { TokenStorage } from '@/utils/token_utils';
// import { supabase } from '@/lib/supabase';
// import * as SplashScreen from 'expo-splash-screen';
// import { Session } from '@supabase/supabase-js';
// import { ConvexAuthProvider } from "@convex-dev/auth/react";
import {ConvexProviderWithClerk} from 'convex/react-clerk';
import { ConvexReactClient , ConvexProvider } from "convex/react";
import * as SecureStore from "expo-secure-store";
import { Platform } from 'react-native';
import { ClerkProvider ,ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export const unstable_settings = {
  anchor: '(tabs)',
};

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});


export default function RootLayout() {
   const colorScheme = useColorScheme();
   const [appIsReady, setAppIsReady] = useState(false);
   const [loading , setLoading] = useState(false);
  const router = useRouter();
  const clerkPublishableKey =process.env.EXPO_CLERK_PUBLISH_KEY
 


  return (

    
    <ClerkProvider publishableKey={clerkPublishableKey!}  tokenCache={tokenCache}>
      <ClerkLoaded>
        <ConvexProviderWithClerk client={convex}  useAuth={useAuth}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <InitalLayout/>
          </ThemeProvider>
          </ConvexProviderWithClerk>
      </ClerkLoaded>
      
    </ClerkProvider>
  );
}

const InitalLayout =()=>{
  const {isLoaded , isSignedIn} = useAuth();
  const segments = useSegments()
  const router = useRouter()
  useEffect (()=>{

     if(!isLoaded) return ;
     const inTabsGroup = segments[0] === '(tabs)';
     if(isSignedIn && !inTabsGroup){
      router.replace('/(tabs)')
     }else if(!isSignedIn){
      router.replace('/(auth)/login')
     }
  // console.log('Signed in')
  },[isSignedIn])
 
  return (
     <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
   </Stack>
  )
}