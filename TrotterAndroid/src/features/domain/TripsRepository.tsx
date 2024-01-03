import {AuthCallback} from "../../core/utils/ApiUtils.ts";

export interface TripsRepository {
  delete: (id: string) => void;
  edit: (name: string, groupId: string, mapping: {}, properties: {}) => void;
  generate: (token: string, lon: number, lat: number, days: number, callback: AuthCallback) => void;
  getTrip: (name: string, groupId: string, mapping: {}, properties: {}) => void;
  getTrips: () => void;
  save: (token: string) => void;
}