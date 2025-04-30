// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';

function CameraTabIcon({ size }: { size: number }) {
  return (
    <View>
      <Ionicons name="camera" size={size} color="black" />
      <MaterialCommunityIcons
        name="brain"
        size={size * 0.6}
        color="blue"
        style={{
          position: 'absolute',
          top: 0,
          right: -10,
        }}
      />
    </View>
  );
}

function ManualTabIcon({ size }: { size: number }) {
  return (
    <View>
      <Ionicons name="create-outline" size={size} color="black" />
      <MaterialCommunityIcons
        name="emoticon-happy-outline"
        size={size * 0.6}
        color="orange"
        style={{
          position: 'absolute',
          top: 0,
          right: -10,
        }}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="principal"
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="camara"
        options={{
          tabBarLabel: 'Cámara',
          tabBarIcon: ({ size }) => <CameraTabIcon size={size} />,
        }}
      />
      <Tabs.Screen
        name="modal" 
        options={{
          tabBarLabel: 'Manual',
          tabBarIcon: ({ size }) => <ManualTabIcon size={size} />,
        }}
      />
    </Tabs>
  );
}
