import {Callback} from "../../core/utils/api/ApiUtils.ts";

export interface CityRepository {
  getCoordinates: (cityName: string, callback: Callback) => void;
}