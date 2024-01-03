import {AuthCallback} from "../../core/utils/ApiUtils.ts";

export interface CityRepository {
  getCoordinates: (cityName: string, callback: AuthCallback) => void;
}