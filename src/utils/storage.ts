import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveJSON(key: string, value: any) {
  // Use localStorage for web, AsyncStorage for native
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

export async function loadJSON(key: string, def: any = null) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : def;
    } else {
      const raw = await AsyncStorage.getItem(key);
      return raw ? JSON.parse(raw) : def;
    }
  } catch (error) {
    console.warn('Storage error:', error);
    return def;
  }
}