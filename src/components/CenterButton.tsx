import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
export const CenterButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.btn} onPress={onPress}><Text>◎</Text></TouchableOpacity>
);
const styles = StyleSheet.create({ btn: { position:'absolute', right:12, bottom:120, backgroundColor:'white', padding:12, borderRadius:24, elevation:4 } });
