import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { PlaceModal } from '../components/PlaceModal';
import { usePlaces } from '../contexts/PlacesContext';
import { CenterButton } from '../components/CenterButton';

export const MapScreen: React.FC = () => {
  const [region, setRegion] = useState({ latitude: 6.5244, longitude: 3.3792, latitudeDelta: 0.05, longitudeDelta: 0.05 });
  const [modalVisible, setModalVisible] = useState(false);
  const [newCoord, setNewCoord] = useState<{lat:number, lon:number}>({lat:0, lon:0});
  const { places } = usePlaces();

  function onMapLongPress(e: any) {
    // For web, we'll simulate a click on the map area
    setNewCoord({ lat: region.latitude, lon: region.longitude });
    setModalVisible(true);
  }

  function onSearchSelect(item: any) {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    setRegion({ latitude: lat, longitude: lon, latitudeDelta: 0.02, longitudeDelta: 0.02 });
  }

  return (
    <View style={styles.container}>
      <SearchBar onSelect={onSearchSelect} />
      
      {/* Web Map Placeholder - you can integrate with Leaflet, Google Maps, or Mapbox */}
      <View style={styles.webMapContainer}>
        <Text style={styles.mapPlaceholder}>Map View (Web)</Text>
        <Text style={styles.coordinates}>
          Current: {region.latitude.toFixed(4)}, {region.longitude.toFixed(4)}
        </Text>
        
        <TouchableOpacity 
          style={styles.mapTouchArea} 
          onPress={onMapLongPress}
        >
          <Text style={styles.touchPrompt}>Tap to add location</Text>
        </TouchableOpacity>

        {/* Display existing places */}
        {places.map(p => (
          <View key={p.id} style={styles.placeMarker}>
            <Text style={styles.placeTitle}>{p.title}</Text>
            <Text style={styles.placeCoords}>
              {p.latitude.toFixed(4)}, {p.longitude.toFixed(4)}
            </Text>
          </View>
        ))}
      </View>

      <CenterButton onPress={() => {
        // For web, you might want to use browser geolocation API
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02
              });
            },
            (error) => {
              console.warn('Geolocation error:', error);
            }
          );
        }
      }} />

      <PlaceModal visible={modalVisible} lat={newCoord.lat} lon={newCoord.lon} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webMapContainer: { 
    flex: 1, 
    backgroundColor: '#f0f0f0', 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  mapPlaceholder: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#666',
    marginBottom: 10 
  },
  coordinates: { 
    fontSize: 16, 
    color: '#888',
    marginBottom: 20
  },
  mapTouchArea: {
    padding: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed'
  },
  touchPrompt: {
    fontSize: 16,
    color: '#666'
  },
  placeMarker: {
    position: 'absolute',
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    minWidth: 100
  },
  placeTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  placeCoords: {
    color: 'white',
    fontSize: 10
  }
});
