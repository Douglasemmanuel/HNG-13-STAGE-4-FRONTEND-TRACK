import React from 'react'
import { TouchableOpacity, StyleSheet, useColorScheme, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type BackButtonProps = {
  onPress: () => void
  style?: ViewStyle
}

export const BackButton = ({ onPress, style }: BackButtonProps) => {
  const theme = useColorScheme()

  const backgroundColor = theme === 'dark' ? '#1c1c1e' : '#ffffff'
  const iconColor = theme === 'dark' ? '#ffffff' : '#000000'

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.button, { backgroundColor }, style]}>
      <Ionicons name="chevron-back" size={24} color={iconColor} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20, // circular
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 5,
  },
})
