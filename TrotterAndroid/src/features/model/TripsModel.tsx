export type TripDataParams = {
  lat: number,
  lon: number,
  cityName?: string,
  days?: number,
}

export type TripsJsonData = {
  features: GeoJSON.FeatureCollection,
  routes: [
    {
      route: GeoJSON.FeatureCollection,
      tripLegData: any[],
      visitOrder: number[],
    }
  ]
}