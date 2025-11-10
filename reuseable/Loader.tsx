// components/LoadingAnimation.tsx

import React from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet , Modal } from 'react-native'

type LoaderProps = {
  isVisible: boolean
}
const Loader:React.FC<LoaderProps> = ({ isVisible }) => {
  return (
    <View>
        <Modal
                  visible={isVisible}
                  transparent
                  animationType="fade"
                  statusBarTranslucent
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                   <View style={styles.container}>
                <LottieView
                    source={require('../lotties/loader.json')}
                    autoPlay
                    loop
                    style={styles.animation}
                />
    </View>
                    </View>
                  </View>
                </Modal>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:50,
  },
  animation: {
    width: 200,
    height: 200,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    width: 200,
    height: 200,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
})

export default Loader;
