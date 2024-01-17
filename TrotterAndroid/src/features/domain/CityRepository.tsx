import {Callback} from "../../core/utils/ApiUtils.ts";

export interface CityRepository {
  getCoordinates: (cityName: string, callback: Callback) => void;
}