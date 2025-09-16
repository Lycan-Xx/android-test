import React, { useState } from 'react';
import { View, Modal, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { usePlaces } from '../contexts/placesContext';

export const PlaceModal: React.FC<{ visible: boolean; lat: number; lon: number; onClose: () => void }> = ({ visible, lat, lon, onClose }) => {
  const { addPlace, types, addType } = usePlaces();
  const [title, setTitle] = useState('');
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined);

  async function save() {
    await addPlace({ title: title || 'Untitled', latitude: lat, longitude: lon, typeId: selectedType ?? null });
    setTitle('');
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{flex:1, justifyContent:'center', backgroundColor:'rgba(0,0,0,0.3)'}}>
        <View style={{margin:20, padding:20, backgroundColor:'white', borderRadius:8}}>
          <Text>New place</Text>
          <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
          <Text>Type</Text>
          <Picker selectedValue={selectedType} onValueChange={(v) => setSelectedType(v)}>
            <Picker.Item label="(none)" value={undefined} />
            {types.map(t => <Picker.Item key={t.id} label={t.name} value={t.id} />)}
          </Picker>
          <Button title="Save" onPress={save} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};