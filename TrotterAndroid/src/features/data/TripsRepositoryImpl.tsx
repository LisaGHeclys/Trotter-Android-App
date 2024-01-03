import {TripsRepository} from "../domain/TripsRepository.tsx";
import {Callback, headers, MOBILE_SERVER_URL} from "../../core/utils/ApiUtils.ts";

class TripsRepositoryImpl implements TripsRepository {
  async delete(id: string): Promise<void> {
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
      //toSetup Toaster for mobile
    }
  }

  async getTrip(name: string, groupId: string, mapping: {}, properties: {}): Promise<void> {

  }

  async getTrips(): Promise<void> {
  }

  async save(token: string): Promise<void> {
    try {
      const response = await fetch(`${MOBILE_SERVER_URL}/trips`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          token: token,
        }),
      })
      //callback.onSuccess(response);
    } catch (error: any) {
      //callback.onFailure(`An error occurred while logging the user ${error}`);
      //toSetup Toaster for mobile
    }
  }
}

export default new TripsRepositoryImpl();