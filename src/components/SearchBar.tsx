import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { searchAddress } from '../services/nominatim';

export const SearchBar: React.FC<{ onSelect: (item: any) => void }> = ({ onSelect }) => {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<any[]>([]);

  async function doSearch(text: string) {
    setQ(text);
    if (text.length < 2) { setResults([]); return; }
    try {
      const res = await searchAddress(text);
      setResults(res);
    } catch (e) { setResults([]); }
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Search address" value={q} onChangeText={doSearch} style={styles.input} />
      <FlatList data={results} keyExtractor={(i) => i.place_id?.toString() ?? i.lat + i.lon}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { setResults([]); setQ(''); onSelect(item); }}>
            <Text style={styles.item}>{item.display_name}</Text>
          </TouchableOpacity>
        )} style={styles.list} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: { backgroundColor: 'white', padding: 8, borderRadius: 6, margin: 8, elevation: 2 },
  list: { maxHeight: 200 },
  item: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' }
});