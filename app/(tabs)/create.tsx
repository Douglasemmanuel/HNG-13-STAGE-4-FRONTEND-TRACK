import { StyleSheet, Text, View, Pressable , Platform  , Linking , Alert , TextInput , ScrollView , Dimensions } from 'react-native';
import React from 'react';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import ProfileImage from '@/modules/profile/components/ProfileImage';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import { ImagePickerAsset } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { useState , useEffect } from 'react';
import { Image } from 'expo-image';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { useUserProfile } from '@/hooks/useUserProfile';
import AppDetailScrollView from '@/reuseable/AppDetailScrollView';
import { useRouter } from 'expo-router';
import { promise } from 'zod';
import { Id } from '@/convex/_generated/dataModel';
const { width, height } = Dimensions.get('window');

type ThreadComposerProps = {
  threadId?: Id<'messages'>;
};
const Create: React.FC<ThreadComposerProps>  = ({threadId}) => {
   const scrollHeight = height * 0.75; 
   const router = useRouter();  
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
      const [mediaFiles, setMediaFiles] = useState<ImagePicker.ImagePickerAsset[]>([]);
    const [disabled , setDisabled] = useState<boolean>(true);
      const [text, setText] = useState('');
      const {userProfile} = useUserProfile();
    const addThread = useMutation(api.messages.addThread);
      const [threadContent, setThreadContent] = useState('');
     const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const capitalize = (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
const handleTextChange = (input: string) => {
  setText(input);
  setDisabled(input.length > 150); 
  if(input.length <= 150){
    setDisabled(!disabled)
  }
};
useEffect(() => {

  setDisabled(text.length > 150);
   setDisabled(!text.trim());
}, [text]);
 const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(null);
const handleSubmit = async () => {
  if (text.length > 150) {
    Alert.alert('Text too short', 'Please enter at least 150 characters.');
    return;
  } 
   try {
    console.log('Submitting text:', text, 'Images:', mediaFiles);
      const mediaIds = await Promise.all(mediaFiles.map(uploadMediaFiles));
    console.log('MediaFILE:',mediaIds)
    await addThread({
      threadId,
      content: text,
      mediaFiles:mediaIds,
      // mediaFiles:mediaFiles, 
    });

router.push('/(tabs)');
    setText('')
    setMediaFiles([]);
    // setImage([]);
 

    console.log('Thread submitted successfully');
  } catch (error) {
    console.error('Error submitting thread:', error);
    Alert.alert('Error', 'Failed to submit thread. Please try again.');
  }
};

 const removeThread = () =>{
    setText('');
   setMediaFiles([]);
};


const uploadMediaFiles = async (image:ImagePickerAsset)=>{
  const uploadUrl = await generateUploadUrl();

  const response = await fetch(image!.uri);

  const blob = await response.blob();
  const result = await  fetch(uploadUrl,{
    method:'POST',
    body:blob,
    headers:{ 'Content-Type': image!.mimeType! },
  });
  const {storageId} = await result.json();
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
      setMediaFiles([result.assets[0],...mediaFiles ,])
    
     
    }
  };
  return (
   <AppSafeAreaProvider>
  <View style={{ paddingLeft: 10, paddingRight: 10 }}>
   
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
        <ProfileImage
          source={{ uri: userProfile?.imageUrl }}
          size={50}
          borderColor={theme.tint}
          borderWidth={3}
        />
        <ThemedText>{capitalize(userProfile?.username || '')}</ThemedText>
      </View>

      <Pressable
        onPress={handleSubmit}
        disabled={disabled}
        style={({ pressed }) => [
          {
            backgroundColor: disabled ? '#A0A0A0' : '#007BFF',
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text
          style={{
            color: disabled ? '#666' : '#fff',
            fontSize: 16,
            fontWeight: '600',
          }}
        >
          Post
        </Text>
      </Pressable>
    </View>

   
      <View style={{ marginTop: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 , }}>
  <TextInput
    value={text}
    onChangeText={(input: string) => handleTextChange(input)}
    placeholder="What's happening..."
    multiline
    style={[
      {
        flex: 1,               // takes remaining space
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: 'top',
        maxHeight: 100,
      },
      { color: theme.text },
    ]}
  />
  {text.length > 0 &&(
     <Pressable onPress={removeThread} style={{ marginLeft: 10 }}>
    <Ionicons name="close" size={28} color={theme.icon} />
  </Pressable>
  )}
 
</View>

   {mediaFiles && (
    <View>
      {mediaFiles.length > 0 &&(
        <ScrollView horizontal>
          {mediaFiles.map((files , index)=>(
              <View style={{ position: 'relative', marginTop: 10 , marginRight:10 }} key={index}>
    <Image
      source={{ uri:files.uri }}
      style={[styles.mediaImage]}
      contentFit="cover"
    />
    <Pressable
      onPress={() => setMediaFiles(mediaFiles.filter((_,i)=>i !== index))} 
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 4,
      }}
    >
      <Ionicons name="trash-outline" size={24} color={theme.icon} />
    </Pressable>
  </View>
          ))}
        </ScrollView>
      )}
    </View>
)}

      </View>

      {/* Bottom icon bar directly under TextInput */}
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          borderBottomWidth: 0.4,
          borderBottomColor: 'grey',
          // backgroundColor:theme.background,
          gap: 35,
        }}
      >
        <Pressable onPress={() => console.log('Text pressed')}>
          <ThemedText>Aa</ThemedText>
        </Pressable>
        <Pressable onPress={() => handleImagePick('gallery')}>
          <Ionicons name="image-outline" size={28} color="#007BFF" />
        </Pressable>
        <Pressable onPress={() => handleImagePick('camera')}>
          <Ionicons name="camera-outline" size={28} color="#007BFF" />
        </Pressable>
      </View>
  
  </View>
</AppSafeAreaProvider>

  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    // position: 'absolute',
    // bottom: 5,
    // left: 0,
    // right: 0,
  },
  iconButton: {
    marginHorizontal: 30,
  },
  mediaImage: {
    width: 100,
    height: 200,
    borderRadius: 6,
    marginRight: 10,
    marginTop: 10,
  },
});
