// eslint-disable-next-line react-native/split-platform-components
import { translate } from '@utils/i18n/translate';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
const hasPermissionOnIOS = async () => {
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  return false;
};
const hasLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionOnIOS();
    return hasPermission;
  }
  if (Platform.OS === 'android' && Platform.Version < 23) {
    return true;
  }
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  );
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: translate('text:popup_location_title'),
      message: translate('text:popup_location_message'),
      buttonPositive: translate('text:agree'),
      buttonNegative: translate('text:cancel'),
      buttonNeutral: translate('text:popup_location_neutral'),
    }
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }
  return false;
};

export const getCurrentLocationGeolocation = async () => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      reject(false);
    }

    Geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        resolve({ longitude, latitude });
      },
      () => reject(false),
      {
        showLocationDialog: true,
        forceRequestLocation: true,
      }
    );
  });
};
export const regionFrom = (lat: number, lon: number, distance: number) => {
  distance = distance / 2;
  const circumference = 40075;
  const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
  const angularDistance = distance / circumference;

  const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
  const longitudeDelta = Math.abs(
    Math.atan2(
      Math.sin(angularDistance) * Math.cos(lat),
      Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat)
    )
  );

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta,
    longitudeDelta,
  };
};
export const openGoogleMap = (lat: number, long: number, address: string) => {
  return Linking.openURL(`http://maps.google.com/maps?daddr=${lat + long}&daddr=${address}`);
};
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const radiusOfEarth = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = radiusOfEarth * c;
  return distance;
}

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}
