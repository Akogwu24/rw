import axios from 'axios';
import { TDestination } from '../screens/MapDirection';

export async function getTravelInfo(startingPoint: TDestination, destination: TDestination, apiKey: string, setTravelInfo: any) {
  try {
    const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(startingPoint.description)}&destinations=${encodeURIComponent(
      destination.description
    )}&key=${apiKey}`;

    const { data } = await axios.get(apiUrl);
    console.log('data', data);
    setTravelInfo(data.rows[0].elements[0]);
  } catch (error) {
    console.log('error', error);
  }
}
