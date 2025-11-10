// components/useable/InputField.tsx
import { ThemedText } from '@/components/themed-text'
import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native'
import { Eye, EyeOff } from 'lucide-react-native'
import { useColorScheme } from 'react-native'
type InputFieldProps = {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  isPassword?: boolean
  isSecure?: boolean
  toggleSecure?: () => void
  inputWidth?: number | string
  inputProps?: TextInputProps
   footer?: React.ReactNode
   textColour ?:string
   error?:String
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  isSecure = false,
  toggleSecure,
  inputWidth = '100%',
  inputProps,
  footer,
  textColour,
  error,
}) => {
    const theme = useColorScheme()
  return (
    <View style={{ marginBottom: 20, width: inputWidth as import('react-native').DimensionValue }}>
      <ThemedText
       style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>{label}
       </ThemedText>

      <View style={styles.inputContainer}>
        <TextInput
           style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]}
          placeholder={placeholder}
          placeholderTextColor="gray"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && isSecure}
          textContentType={isPassword ? 'oneTimeCode' : 'none'} // <-- Important
          autoComplete={isPassword ? 'off' : 'off'} 
          autoCorrect={false}
          {...inputProps}
        />

        {isPassword && toggleSecure && (
          <TouchableOpacity onPress={toggleSecure} style={styles.icon}>
            {isSecure ? (
              <EyeOff size={20} color="gray" />
            ) : (
              <Eye size={20} color="gray" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error ? (
              <ThemedText style={styles.errorText}>{error}</ThemedText>
            ) : footer ? (
              <View style={styles.footer}>{footer}</View>
            ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    paddingLeft: 10,
  },
   footer: {
    marginTop: 6,
  },
  errorText: {
    color: '#FF4D4F',
    marginTop: 6,
    fontSize: 13,
  },
})

export default InputField
