// components/SearchBar.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

interface Props {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
}

export default function SearchBar({ placeholder = 'Search...', onChangeText, value }: Props) {
    const colorScheme = useColorScheme() || 'light'; 
    const theme = Colors[colorScheme];

  return (
    <View style={[styles.container,{ backgroundColor: theme.background}]}>
      <Ionicons
        name="search"
        size={20}
        color={theme.icon}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input,{color:theme.text}]}
        placeholder={placeholder}
        placeholderTextColor={theme.text}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 10 : 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
