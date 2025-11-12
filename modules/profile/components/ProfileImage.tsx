// components/ProfileImage.tsx
import React, { useState } from 'react';
import { useColorScheme, View, TouchableOpacity, Modal, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  source: any;
  size?: number;
  borderColor?: string;
  borderWidth?: number;
  showCamera?: boolean;
  onPress?: () => void;
  onion?: (mode: 'camera' | 'gallery') => void; // ✅ passed from parent
}

const ProfileImage: React.FC<Props> = ({
  source,
  size = 100,
  borderColor = '#fff',
  borderWidth = 2,
  showCamera = false,
  onion, 
  onPress,
}) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const [selectedMode, setSelectedMode] = useState<'camera' | 'gallery' | null>(null);
  

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* Profile Image */}
      <View
        style={[
          styles.imageWrapper,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
        ]}
      >
        <Image
          source={source}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      </View>

      {/* Camera button */}
      {showCamera && (
        <TouchableOpacity
          style={[
            styles.cameraButton,
            {
              bottom: size * 0.05,
              right: size * -0.05,
            },
          ]}
          onPress={openModal}
          activeOpacity={0.8}
        >
          <Ionicons name="camera" size={20} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Modal for camera/gallery options */}
      {/* <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
      <TouchableWithoutFeedback>
          <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Profile Picture</Text>

            <View style={styles.iconRow}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  closeModal();
                  onion?.('camera'); // ✅ trigger parent function
                }}
              >
                <Ionicons name="camera" size={40} color={theme.icon} />
                <Text style={styles.iconLabel}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  closeModal();
                  onion?.('gallery'); // ✅ trigger parent function
                }}
              >
                <Ionicons name="images" size={40} color={theme.icon} />
                <Text style={styles.iconLabel}>Gallery</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
              <Text style={[styles.cancelText, { color: theme.text }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </Modal> */}
      <Modal
  visible={modalVisible}
  transparent
  animationType="slide"
  onRequestClose={closeModal}
  // statusBarTranslucent
>
  {/* Overlay that closes modal when tapped */}
  <TouchableWithoutFeedback onPress={closeModal}>
    <View style={styles.modalOverlay}>
      {/* Prevent touches inside the modal from closing it */}
      <TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Change Profile Picture</Text>

          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                // closeModal();
                onion?.('camera');
                 setSelectedMode('camera');
              }}
            >
              <Ionicons name="camera" size={40} color={theme.icon} />
              <Text style={styles.iconLabel}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                 setSelectedMode('gallery');
               
                onion?.('gallery');
                 closeModal();
              }}
            >
              <Ionicons name="images" size={40} color={theme.icon} />
              <Text style={styles.iconLabel}>Gallery</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
          //  onPress={closeModal} 
          onPress={() => {
              if (selectedMode) {
               
                onion?.(selectedMode); 
              }
              closeModal();            
              setSelectedMode(null);   
            }}
           style={styles.cancelButton}>
            <Text style={[styles.cancelText, { color: 'black' }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>

    </View>
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  imageWrapper: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  iconLabel: {
    marginTop: 6,
    fontSize: 14,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    // backgroundColor: '#eee',
    borderRadius: 8,
  },
  cancelText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
