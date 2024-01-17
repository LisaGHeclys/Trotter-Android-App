import {CityRepository} from "../domain/CityRepository.tsx";
import {Callback, headers} from "../../core/utils/ApiUtils.ts";

class CityRepositoryImpl implements CityRepository {
  async getCoordinates(cityName: string, callback: Callback): Promise<void> {
    const MOBILE_OTM_KEY = process.env.REACT_APP_MOBILE_OTM_KEY;
    try {
      const response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${cityName}&apikey=${MOBILE_OTM_KEY}`, {
        headers: headers,
      })
      callback.onSuccess(response);
    } catch (error: any) {
      callback.onFailure(`An error occurred while retrieving the coordinates of ${cityName}: ${error}`);
      //toSetup Toaster for mobile
    }
  }
}

export default new CityRepositoryImpl();