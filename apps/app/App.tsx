import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

type Coordinates = {
  latitude: number;
  longitude: number;
};

function DiscoverScreen() {
  const [coords, setCoords] = useState<Coordinates | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const current = await Location.getCurrentPositionAsync({});
        setCoords({ latitude: current.coords.latitude, longitude: current.coords.longitude });
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#020617' }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#f8fafc' }}>Discover meetups</Text>
        <Text style={{ marginTop: 12, color: '#94a3b8' }}>
          Hyperlocal events show up once you share location access.
        </Text>
        {coords ? (
          <View style={{ marginTop: 32 }}>
            <Text style={{ color: '#38bdf8' }}>
              Current location: {coords.latitude.toFixed(3)}, {coords.longitude.toFixed(3)}
            </Text>
          </View>
        ) : (
          <Text style={{ marginTop: 32, color: '#fbbf24' }}>Waiting for location permission…</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Discover">
        <Stack.Screen name="Discover" component={DiscoverScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
