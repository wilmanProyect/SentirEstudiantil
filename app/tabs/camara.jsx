import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import useUserStore from '../../store/userStore';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const [showInstruction, setShowInstruction] = useState(true);
  const addEmocion = useUserStore((state) => state.addEmocion);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para usar la cámara</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Otorgar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhotoUri(photo.uri);
        setShowInstruction(false); // Hide the instruction after taking photo
        
        const newPath = FileSystem.cacheDirectory + 'photos/' + Date.now() + '.jpg';
        
        await FileSystem.copyAsync({
          from: photo.uri,
          to: newPath
        });
    
        addEmocion({
          type: 'foto',
          uri: newPath,
          fecha: new Date().toISOString()
        });
        
        Alert.alert('Éxito', 'Foto guardada correctamente');
      } catch (error) {
        console.error('Error al tomar foto:', error);
        Alert.alert('Error', 'No se pudo guardar la foto');
      }
    }
  };

  if (photoUri) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photoUri }} style={styles.preview} />
        <TouchableOpacity 
          style={styles.closePreview} 
          onPress={() => {
            setPhotoUri(null);
            setShowInstruction(true); // Show instruction again when returning to camera
          }}
        >
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
      >
        {showInstruction && (
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>Toma una selfie para identificar tus emociones</Text>
          </View>
        )}
        
        <View style={styles.controlsContainer}>
          <TouchableOpacity 
            style={styles.captureButton} 
            onPress={takePicture}
          >
            <View style={styles.innerCaptureButton} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.flipButton} 
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  instructionContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCaptureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  flipButton: {
    position: 'absolute',
    right: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closePreview: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
    fontSize: 16,
  },
  permissionButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});