import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<Text>Expo 53 minimal app is running.</Text>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});


