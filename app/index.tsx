import { Text, View, TextInput, StyleSheet, ImageBackground } from 'react-native';

export default function Index() {
  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={style.background}
    >
      <View style={style.container}>
        <Text>Hola, Tus sentimientos son importantes cuentanos más de ti</Text>
        <TextInput placeholder="Nombre" />
        <TextInput placeholder="Edad" />
      </View>
    </ImageBackground>

  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});        