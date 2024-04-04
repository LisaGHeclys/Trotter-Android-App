import {TripsRepository} from "../domain/TripsRepository.tsx";
import {Callback, headers, MOBILE_SERVER_URL} from "../../core/utils/api/ApiUtils.ts";

class TripsRepositoryImpl implements TripsRepository {
  async delete(token: string, id: string, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/trips/${id}`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while deleting the trip ${error}`);
    }
  }

  async edit(name: string, groupId: string, mapping: {}, properties: {}): Promise<void> {
  }

  async generate(token: string, lon: number, lat: number, days: number, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/IA`, {
        method: 'POST',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          lon: lon,
          lat: lat,
          days: days,
        }),
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while generating the trip of the user ${error}`);
    }
  }

  async getTrip(name: string, groupId: string, mapping: {}, properties: {}): Promise<void> {

  }

  async getTrips(token: string, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/trips`, {
        method: 'GET',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while loading trips ${error}`);
    }
  }

  async save(startDate: number, endDate: number, housingCoordinates: number[], cityName: string, tripData: object, token: string, callback: Callback): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/trips`, {
        method: 'POST',
        headers: {
          ...headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
          housingCoordinates: housingCoordinates,
          cityName: cityName,
          tripData: tripData,
        }),
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while saving trip ${error}`);
    }
  }
}

export default new TripsRepositoryImpl();