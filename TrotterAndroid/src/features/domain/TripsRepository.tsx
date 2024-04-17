import {Callback} from "../../core/utils/api/ApiUtils.ts";
import {TransportationTypes} from "../presentation/ui/user/homescreen/UserHomeScreen.tsx";

export interface TripsRepository {
  delete: (token: string, id: string, callback: Callback) => void;
  edit: (name: string, groupId: string, mapping: {}, properties: {}) => void;
  generate: (token: string, lon: number, lat: number, days: number, transportationType: TransportationTypes,  callback: Callback) => void;
  getTrip: (name: string, groupId: string, mapping: {}, properties: {}) => void;
  getTrips: (token: string, callback: Callback) => void;
  save: (startDate: number, endDate: number, housingCoordinates: number[], cityName: string, tripData: object, token: string, callback: Callback) => void;
}