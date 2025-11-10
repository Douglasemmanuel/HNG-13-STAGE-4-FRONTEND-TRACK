import React from 'react';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image  , View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarShowLabel: false, 
        tabBarButton: HapticTab,
        headerShown: false, 
      }}
    >
   
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
  <Tabs.Screen
  name="search"
  options={{
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="search" size={size ?? 28} color={color} />
    ),
  }}
/>

<Tabs.Screen
  name="create"
  options={{
    tabBarButton: (props) => (
      <View
        style={{
          position: 'absolute',
          top: -25, // lift above tab bar
          justifyContent: 'center',
          alignItems: 'center',
          // ...props.style,
        }}
      >
        <HapticTab {...props}>
          <Ionicons name="add-circle" size={60} color={Colors.light.tint} />
        </HapticTab>
      </View>
    ),
  }}
/>


   
      {/* <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.crop.circle" color={color} />
          ),
        }}
      /> */}
    <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/Douglas.jpeg')} // ✅ correct path
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderWidth: focused ? 2 : 0,
                borderColor: Colors[colorScheme ?? 'light'].tint,
              }}
              resizeMode="cover"
            />
          ),
        }}
      />

    </Tabs>
  );
}
