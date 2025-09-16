import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { SearchBar } from '../components/SearchBar';
import { getCurrentLocationAsync } from '../services/locationService';
import { PlaceModal } from '../components/PlaceModal';
import { usePlaces } from '../contexts/PlacesContext';
import { CenterButton } from '../components/CenterButton';

export const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView | null>(null);
  const [region, setRegion] = useState<any>({ latitude: 6.5244, longitude: 3.3792, latitudeDelta: 0.05, longitudeDelta: 0.05 });
  const [modalVisible, setModalVisible] = useState(false);
  const [newCoord, setNewCoord] = useState<{lat:number, lon:number}>({lat:0, lon:0});
  const { places } = usePlaces();

  useEffect(() => { (async () => { try { const coords = await getCurrentLocationAsync(); setRegion({ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }); mapRef.current?.animateToRegion({ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 500); } catch (e) { /* permission denied */ } })(); }, []);

  function onMapLongPress(e: any) {
    const { coordinate } = e.nativeEvent;
    setNewCoord({ lat: coordinate.latitude, lon: coordinate.longitude });
    setModalVisible(true);
  }

  function onSearchSelect(item: any) {
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    mapRef.current?.animateToRegion({ latitude: lat, longitude: lon, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 400);
  }

  return (
    <View style={styles.container}>
      <SearchBar onSelect={onSearchSelect} />
      <MapView ref={mapRef} style={styles.map} initialRegion={region} onLongPress={onMapLongPress}>
        <UrlTile urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} maximumZ={19} />
        {places.map(p => (
          <Marker key={p.id} coordinate={{ latitude: p.latitude, longitude: p.longitude }} title={p.title} />
        ))}
      </MapView>

      <CenterButton onPress={async () => { try { const coords = await getCurrentLocationAsync(); mapRef.current?.animateToRegion({ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }, 400); } catch (e) { Alert.alert('Location permission required'); } }} />

      <PlaceModal visible={modalVisible} lat={newCoord.lat} lon={newCoord.lon} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 }, map: { flex: 1 } });