import { useCallback, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { GOOGLE_PLACES_API_KEY } from '../utils/constants';

export const useGetAddressFromCoordinates = () => {
  const [address, setAddress] = useState<Location.LocationGeocodedAddress>();

  const getAddressFromCoordinates = useCallback(async (latitude: number, longitude: number) => {
    try {
      const location = await Location.reverseGeocodeAsync({ latitude, longitude });
      const firstLocation = location[0];

      if (firstLocation) {
        setAddress(firstLocation);
      }

      // return firstLocation;
    } catch (error) {
      console.error('Error getting address:', error);
    }
  }, []);

  return { getAddressFromCoordinates, address };
};

// export const getAddressFromCoordinates = async (latitude, longitude) => {
//   const [address, setAddress] = useState('');
//   try {
//     const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_PLACES_API_KEY}`);

//     if (response.data.results.length > 0) {
//       setAddress(response.data.results[0].formatted_address);
//     } else {
//       setAddress('Address not found');
//     }
//   } catch (error) {
//     console.error('Error fetching address:', error);
//   }
// };
