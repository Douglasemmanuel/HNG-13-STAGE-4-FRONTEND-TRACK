import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { useUserStore } from '@/modules/auth/store/AuthStore';
import ProfileImage from './ProfileImage';
import { ImagePickerAsset } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useMutation , useQuery } from 'convex/react';
import {api} from '../../../convex/_generated/api';
import { Id , Doc } from "../../../convex/_generated/dataModel";
import { useUserProfile } from '@/hooks/useUserProfile';

const Main: React.FC = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const { currentUser } = useUserStore();
  const router = useRouter();
  const { userProfile } = useUserProfile();
  const userId = userProfile?._id
const generateUploadUrl = useMutation(api.users.generateUploadUrl);
const updateUser = useMutation(api.users.updateUser);
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(null);
     const profile = useQuery(api.users.getUserById, { userId: userId as Id<'users'> });
  
  const isSelf = profile?._id === userId;
   console.log('PROFILE',profile?._id)
    console.log('SET-PROFILE',isSelf)
    console.log('USER-PROFILE',userProfile?._id)
  // const profile = useQuery(api.users.getUserByClerkId, { clerkId: userProfile?._id });

  // const isSelf = currentUser.id === userId;
  const capitalize = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const onDone = async()=>{
    let storageId = null ;
    if(selectedImage){
    storageId = await updateProfilePicture();
    }
    const toUpdate:any ={
       _id: currentUser.id as Id<'users'>,
    }
    if(storageId){
      toUpdate.imageUrl = storageId;
    }
     await updateUser(toUpdate)
      // router.dismiss()
  }
const updateProfilePicture = async ()=>{
  const uploadUrl = await generateUploadUrl();

  const response = await fetch(selectedImage!.uri);

  const blob = await response.blob();
  const result = await  fetch(uploadUrl,{
    method:'POST',
    body:blob,
    headers:{ 'Content-Type': selectedImage!.mimeType! },
  });
  const {storageId} = await result.json();
  console.log('STORAGE-ID',storageId)
  return storageId;
};
  const handleImagePick = async (mode: 'camera' | 'gallery') => {
    const pickerFn =
      mode === 'camera'
        ? ImagePicker.launchCameraAsync
        : ImagePicker.launchImageLibraryAsync;

    const result = await pickerFn({
      mediaTypes: ['images' , 'livePhotos'],
      allowsEditing: true,
      aspect: [4, 3], 
      quality: 1, 
    });

    if (!result.canceled && result.assets?.length > 0) {
      const selected = result.assets[0];
      console.log('✅ Selected image:', selected.uri);
      setSelectedImage(selected); // ✅ update state
      await onDone();
    }
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <ProfileImage
        source={{
          uri: selectedImage ? selectedImage.uri : currentUser.avatar || undefined,
        }}
        size={120}
        borderColor={theme.tint}
        borderWidth={3}
        showCamera={true}
        onion={handleImagePick}
        onPress={onDone}
      />

      <ThemedText type="subtitle" style={{ marginTop: 5 }}>
        {capitalize(currentUser.firstName || '')} {capitalize(currentUser.lastName || '')}
      </ThemedText>
    </View>
  );
};

export default Main;
