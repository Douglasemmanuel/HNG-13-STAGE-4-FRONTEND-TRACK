import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Theme } from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
}

const SafeAreaWrapper = ({ children }: Props) => {
  const theme = useTheme() as Theme;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
      edges={['top', 'bottom', 'left', 'right']} // ensures SafeAreaView respects all insets
    >
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
};

const AppSafeAreaProvider = ({ children }: Props) => {
  return (
    <SafeAreaProvider>
      <SafeAreaWrapper>{children}</SafeAreaWrapper>
    </SafeAreaProvider>
  );
};

export default AppSafeAreaProvider;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
