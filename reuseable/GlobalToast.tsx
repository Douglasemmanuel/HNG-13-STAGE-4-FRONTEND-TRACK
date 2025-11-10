import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToastManager from 'toastify-react-native';

const GlobalToast = () => {
  return (
    <View style={styles.toastWrapper}>
      <ToastManager
        // 🔹 Core sizing & layout
        width="90%"              
        minHeight={65}           
        position="top"           
        topOffset={70}           
        bottomOffset={20}        

        // 🔹 Toast appearance
        toastStyle={{
          borderRadius: 10,
        //   pading:10,
          paddingVertical: 10,
          paddingHorizontal:15,
          backgroundColor: '#2c2c2c', 
        }}
        textStyle={{
          fontSize: 12,
          color: '#fff',             
        }}
        theme="dark"                

        // 🔹 Behavior
        duration={3000}              
        animationStyle="fade"       
        showCloseIcon={true}
        showProgressBar={true}
        isRTL={false}
        useModal={true}            

        // 🔹 Icons
        iconSize={20}
        iconFamily="Ionicons"
        closeIcon="close-outline"
        closeIconSize={20}
        closeIconColor="#fff"
        closeIconFamily="Ionicons"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 9999,
    pointerEvents: 'box-none', 
  },
});

export default GlobalToast;
