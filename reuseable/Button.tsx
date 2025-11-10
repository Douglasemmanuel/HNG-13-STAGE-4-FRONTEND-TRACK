// components/CustomButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
type ButtonSize = 'small' | 'medium' | 'large';
type WidthOption = 'small' | 'medium' | 'large' | 'full' | 'auto';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  width?: WidthOption;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  size = 'medium',
  width = 'auto',
  buttonStyle,
  textStyle,
}) => {
  const sizeStyles = getSizeStyles(size);
  const widthStyle = getWidthStyle(width);

  return (
    <TouchableOpacity
      style={[styles.button, sizeStyles.button, widthStyle, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, sizeStyles.text, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Padding + font size by button size
const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return {
        button: {
          paddingVertical: 6,
          paddingHorizontal: 12,
        },
        text: {
          fontSize: 14,
        },
      };
    case 'large':
      return {
        button: {
          paddingVertical: 14,
          paddingHorizontal: 24,
        },
        text: {
          fontSize: 20,
        },
      };
    case 'medium':
    default:
      return {
        button: {
          paddingVertical: 10,
          paddingHorizontal: 18,
        },
        text: {
          fontSize: 16,
        },
      };
  }
};

// Width by width option
const getWidthStyle = (width: WidthOption): ViewStyle => {
  switch (width) {
    case 'small':
      return { width: 100 };
    case 'medium':
      return { width: 180 };
    case 'large':
      return { width: 260 };
    case 'full':
      return { alignSelf: 'stretch', width: '100%' };
    case 'auto':
    default:
      return { alignSelf: 'flex-start' };
  }
};

const styles = StyleSheet.create({
  button: {
     backgroundColor:'blue' , 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color:'white',
    fontWeight: 'bold',
  },
});

export default CustomButton;
