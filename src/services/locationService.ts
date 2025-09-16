import * as Location from 'expo-location';

export async function getCurrentLocationAsync() {
  try {
    // Request permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.warn('Error getting location:', error);
    // Return a fallback location (e.g., Lagos, Nigeria)
    return {
      latitude: 6.5244,
      longitude: 3.3792,
    };
  }
}
