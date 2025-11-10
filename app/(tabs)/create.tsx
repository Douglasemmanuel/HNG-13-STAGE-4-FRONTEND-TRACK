import { StyleSheet, Text, View, Pressable , Platform  , Linking , Alert , TextInput , ScrollView , Dimensions } from 'react-native';
import React from 'react';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import ProfileImage from '@/modules/profile/components/ProfileImage';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';
import * as ImagePicker from 'expo-image-picker';
import { useState , useEffect } from 'react';
import { Image } from 'expo-image';
import AppDetailScrollView from '@/reuseable/AppDetailScrollView';
const { width, height } = Dimensions.get('window');
const Create: React.FC = () => {
   const scrollHeight = height * 0.75; 
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
    const [image, setImage] = useState<string | null>(null);
    const [disabled , setDisabled] = useState<boolean>(true);
      const [text, setText] = useState('');
  

const handleTextChange = (input: string) => {
  setText(input);
  setDisabled(input.length > 50); 
  if(input.length <= 50){
    setDisabled(!disabled)
  }
};
useEffect(() => {

  setDisabled(text.length > 50);
}, [text]);

const handleSubmit = () => {
  if (text.length > 50) {
    Alert.alert('Text too short', 'Please enter at least 200 characters.');
  } else {
    // Submit your text here
    console.log('Submitted text:', text);
  }
};



     const uploadImage = async (mode?: 'gallery' | 'camera') => {
    try {
      const isGallery = mode === 'gallery';

     
      const permission = await (isGallery
        ? ImagePicker.requestMediaLibraryPermissionsAsync()
        : ImagePicker.requestCameraPermissionsAsync());

      if (permission.status !== 'granted') {
        Alert.alert(
          'Permission Required',
          `Please grant ${isGallery ? 'photo library' : 'camera'} permission to continue.`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => {
                Platform.OS === 'ios'
                  ? Linking.openURL('app-settings:')
                  : Linking.openSettings();
              },
            },
          ]
        );
        return;
      }

      const pickerFn = isGallery
        ? ImagePicker.launchImageLibraryAsync
        : ImagePicker.launchCameraAsync;

      const result = await pickerFn({
        mediaTypes:['images' , 'livePhotos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      
      if (!result.canceled && result.assets?.length) {
        const uri = result.assets[0].uri;
        setImage(uri);
        console.log('✅ Image selected:', uri);
        setDisabled(true);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
    }
  };

  return (
    <AppSafeAreaProvider>
      <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <ProfileImage
            source={require('../../assets/images/Douglas.jpeg')}
            size={50}
            borderColor={theme.tint}
            borderWidth={3}
          />

         <Pressable
  onPress={handleSubmit}
  disabled={true} 
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
  <Text style={{ color: disabled ? '#666' : '#fff', fontSize: 16, fontWeight: '600' }}>
    Post
  </Text>
</Pressable>

        </View>
 <AppDetailScrollView  height={scrollHeight}>
        {/* Content area */}
        <View style={{ flex: 1, marginTop: 20 }}>
           <TextInput
  value={text}
    onChangeText={(input: string) => handleTextChange(input)}
  placeholder="What's happening..."
  multiline
  style={[
    {
      width: '100%',
      // flex: 1,
      fontSize:18,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 20,
      textAlignVertical: 'top', // ensures text starts at top
    },
    { color: theme.text },
  ]}
/>

  {image && (
    <Image
      source={{ uri: image }}
      style={{
        width: '100%',
        height: 250,
        borderRadius: 10,
      }}
       contentFit="cover"
    />
  )}
</View>
</AppDetailScrollView>

        {/* Bottom icon bar */}
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Pressable onPress={() => console.log('Image pressed')} style={styles.iconButton}>
            <ThemedText>Aa</ThemedText>
          </Pressable>
          <Pressable onPress={() =>  uploadImage('gallery')} style={styles.iconButton}>
            <Ionicons name="image-outline" size={28} color="#007BFF" />
          </Pressable>
          
          <Pressable onPress={() => uploadImage('camera')} style={styles.iconButton}>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
  },
  iconButton: {
    marginHorizontal: 30,
  },
});
