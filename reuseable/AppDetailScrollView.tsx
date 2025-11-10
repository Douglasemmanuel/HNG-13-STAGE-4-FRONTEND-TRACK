import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

const { height: screenHeight } = Dimensions.get('window');

interface AppScrollViewProps extends ScrollViewProps {
  height?: number | `${number}%`; // ✅ enforce valid DimensionValue type
  children: React.ReactNode;
}

const AppDetailScrollView: React.FC<AppScrollViewProps> = ({
  height,
  children,
  contentContainerStyle,
  style,
  ...props
}) => {
    const colorScheme = useColorScheme() || 'light';
    const theme = Colors[colorScheme];
    const isDarkMode = colorScheme === 'dark';

  // Convert height prop to a usable number if it’s percentage
  const resolvedHeight =
    typeof height === 'string' && height.endsWith('%')
      ? (screenHeight * parseFloat(height) / 100)
      : height;

  return (
    <ScrollView
      style={[height ? { height: resolvedHeight } : {}, style]}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      indicatorStyle={isDarkMode ? 'white' : 'black'}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default AppDetailScrollView;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 30,
    flexGrow: 1,
  },
});
