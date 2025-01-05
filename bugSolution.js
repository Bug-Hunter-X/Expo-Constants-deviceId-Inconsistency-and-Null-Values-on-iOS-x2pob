import * as Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import uuid from 'react-native-uuid'; // Make sure to install this package: `expo install react-native-uuid`

const generateDeviceId = async () => {
  let deviceId = await SecureStore.getItemAsync('deviceId');
  if (!deviceId) {
    deviceId = uuid.v4();
    await SecureStore.setItemAsync('deviceId', deviceId);
  }
  return deviceId;
};

export const getDeviceId = async () => {
  //Try to get the expo device Id
  let expoDeviceId = Constants.deviceId;

  // If Expo's deviceId is null or undefined, use a more reliable method
  if (!expoDeviceId) {
    expoDeviceId = await generateDeviceId();
  }
  return expoDeviceId;
};

// Example Usage
//getDeviceId().then(id => console.log('Device ID:', id));