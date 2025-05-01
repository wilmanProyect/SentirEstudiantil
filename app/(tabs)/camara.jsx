import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import useUserStore from '../../store/userStore';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const [showInstruction, setShowInstruction] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const addEmocion = useUserStore((state) => state.addEmocion);
  const router = useRouter();

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
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
        setPhotoUri(photo.uri);
        setShowInstruction(false);
      } catch (error) {
        console.error('Error al tomar foto:', error);
        Alert.alert('Error', 'No se pudo tomar la foto');
      }
    }
  };

  const processImage = async () => {
    if (!photoUri) return;
    
    setIsProcessing(true);
    try {
      const emotions = await analyzeEmotions(photoUri);
      
      // Guardar copia de la foto
      const newPath = FileSystem.cacheDirectory + 'photos/' + Date.now() + '.jpg';
      await FileSystem.copyAsync({
        from: photoUri,
        to: newPath
      });
      
      addEmocion({
        type: 'foto',
        uri: newPath,
        fecha: new Date().toISOString(),
        emociones: emotions
      });
      
      router.push({
        pathname: '/resultado',
        params: { emotions: JSON.stringify(emotions) }
      });
      
    } catch (error) {
      Alert.alert(
        'Error de Análisis',
        error.message,
        [
          { text: 'Reintentar', onPress: () => processImage() },
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
    } finally {
      setIsProcessing(false);
    }
  };
  const analyzeEmotions = async (imageUri) => {
    try {
        setIsProcessing(true); // Asegúrate de que el estado de procesamiento se gestione correctamente

        const apiKey = "w_v2S-O9K5-YcTcQVej9Rqg_a-BJoF8A";
        const apiSecret = "oEpvX3XsRvUt8f65pSAYq6WZZoVmsApo";
        const url = "https://api-us.faceplusplus.com/facepp/v3/detect"; // Endpoint de detección de Face++ (región EEUU)

        const formData = new FormData();
        formData.append('api_key', apiKey);
        formData.append('api_secret', apiSecret);
        formData.append('image_file', {
            uri: imageUri,
            type: 'image/jpeg', // Asegúrate de que el tipo sea correcto
            name: 'photo.jpg'
        });
        formData.append('return_attributes', 'emotion'); // Solicitar el atributo de emoción

        const response = await fetch(url, {
          method: 'POST',
          body: formData
      });
  
      if (!response.ok) {
          const errorText = await response.text(); // Leer la respuesta como texto
          console.error('Error de Face++ (HTTP):', response.status, errorText);
          throw new Error(`Face++ API error: ${response.status} - ${errorText}`);
      }
  
      const responseText = await response.text(); // Leer la respuesta como texto para inspeccionar
      console.log('Respuesta SIN PARSEAR de Face++:', responseText);
  
      const result = JSON.parse(responseText); // Intentar parsear el texto como JSON
      console.log('Respuesta PARSEADA de Face++:', JSON.stringify(result, null, 2));
  

        // Formatear la respuesta de Face++ para que coincida con tu estructura anterior
        const emotions = result.faces[0].attributes.emotion;
        return {
            happiness: Math.round(emotions.happiness), // Face++ da valores en escala 0-100
            neutral: Math.round(emotions.neutral),
            sadness: Math.round(emotions.sadness),
            anger: Math.round(emotions.anger),
            surprise: Math.round(emotions.surprise),
            fear: Math.round(emotions.fear),
            disgust: Math.round(emotions.disgust)
        };

    } catch (error) {
      console.error('Error al analizar emociones con Face++:', {
        message: error.message,
        stack: error.stack,
        // responseBody: responseBody // Si guardaste la respuesta como texto en el error
    });
    Alert.alert(
        'Error de Análisis',
        error.message,
        [{ text: 'Reintentar', onPress: () => processImage() }, { text: 'Cancelar', style: 'cancel' }]
    );
    throw new Error(`Face++ Analysis Error: ${error.message}`);
    } finally {
        setIsProcessing(false);
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
            setShowInstruction(true);
          }}
        >
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.processButton}
          onPress={processImage}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.processButtonText}>Procesar Emociones</Text>
          )}
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
  previewContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  processButton: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  processButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  retryText: {
    color: 'white',
    textAlign: 'center',
  }
});