import {Callback} from "../../core/utils/api/ApiUtils.ts";

export interface TripsRepository {
  delete: (id: string) => void;
  edit: (name: string, groupId: string, mapping: {}, properties: {}) => void;
  generate: (token: string, lon: number, lat: number, days: number, callback: Callback) => void;
  getTrip: (name: string, groupId: string, mapping: {}, properties: {}) => void;
  getTrips: () => void;
  save: (token: string) => void;
}