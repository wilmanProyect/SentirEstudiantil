import { View, Text, StyleSheet, ImageBackground,TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Resultado() {
  const { emotions } = useLocalSearchParams();
  const emotionsData = JSON.parse(emotions);
  const router = useRouter();

  const formatEmotionName = (emotion) => {
    const names = {
      happiness: 'Felicidad',
      sadness: 'Tristeza',
      anger: 'Enojo',
      surprise: 'Sorpresa',
      fear: 'Miedo',
      disgust: 'Disgusto',
      neutral: 'Neutral',
      contempt: 'Desprecio'
    };
    return names[emotion] || emotion;
  };

  // Ordenar emociones por porcentaje (mayor a menor)
  const sortedEmotions = Object.entries(emotionsData)
    .sort(([, a], [, b]) => b - a);

  const getAdvice = (emotions) => {
    const mainEmotion = sortedEmotions[0][0]; // La emoción principal (la primera después de ordenar)
    const advice: { [key: string]: string } = {
      happiness: "¡Qué bueno que te sientas feliz! Sigue disfrutando de este momento y comparte tu alegría con los demás.",
      sadness: "Entiendo que te sientas triste. Permítete sentir estas emociones y recuerda que no estás solo. Hablar con alguien de confianza o realizar alguna actividad que disfrutes puede ayudarte.",
      anger: "Parece que estás enojado. Es importante manejar este sentimiento de forma saludable. Intenta respirar profundo, hacer ejercicio o hablar sobre lo que te molesta de manera calmada.",
      surprise: "¡Sorpresa! Esta emoción puede ser tanto positiva como negativa. Tómate un momento para procesar lo que sucedió y cómo te hace sentir.",
      fear: "Sientes miedo. Es una emoción natural, pero si te paraliza, busca apoyo. Identifica la causa de tu miedo y considera pequeños pasos para enfrentarlo.",
      disgust: "Sientes disgusto. Esta emoción puede indicar que algo no te agrada o te parece incorrecto. Reflexiona sobre ello y considera si es necesario hacer algún cambio.",
      neutral: "Te sientes neutral. A veces, estar en un estado neutral es necesario para descansar y recargar energías. No hay presión de sentirte de una manera específica todo el tiempo.",
      contempt: "Sientes desprecio. Esta emoción es compleja y puede dañar tus relaciones. Intenta comprender el origen de este sentimiento y busca formas más empáticas de relacionarte con los demás."
    };
    return advice[mainEmotion] || "No tengo un consejo específico para esta combinación de emociones.";
  };

  const adviceMessage = getAdvice(emotionsData);

  return (
    <ImageBackground
      source={require('../assets/images/Backgound2.jpg')}
      style={styles.background}
    >
      <Text style={styles.title}>Resultado del análisis</Text>

      <View style={styles.emotionsContainer}>
        {sortedEmotions.map(([emotion, value]) => (
          <View key={emotion} style={styles.emotionRow}>
            <Text style={styles.emotionName}>{formatEmotionName(emotion)}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${value}%` }]} />
            </View>
            <Text style={styles.emotionValue}>{value}%</Text>
          </View>
        ))}
      </View>
      <View style={styles.adviceContainer}>
        <Text style={styles.adviceTitle}>Consejo:</Text>
        <Text style={styles.adviceText}>{adviceMessage}</Text>
      </View>
      <TouchableOpacity
          onPress={() => router.push('/principal')}
          style={{
            backgroundColor: '#007AFF',
            padding: 15,
            borderRadius: 10,
            marginTop: 20,
            alignItems: 'center',
          }}
        >
        <Text>Volver</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'white',
  },
  emotionsContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  emotionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  emotionName: {
    width: 100,
    fontSize: 16,
    color: '#333',
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  emotionValue: {
    width: 50,
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  adviceContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#e3f2fd', // Un color de fondo suave para el consejo
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#b0e0f5',
  },
  adviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00509e', // Un color más oscuro para el título
    marginBottom: 10,
    textAlign: 'center',
  },
  adviceText: {
    fontSize: 16,
    color: '#00509e', // El mismo color que el título para el texto
    textAlign: 'justify',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
},
buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
}
});
