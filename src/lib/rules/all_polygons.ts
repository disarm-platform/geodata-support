import { GeoJsonFeatureCollection } from "../TGeoJSON";

// Geodata contains only Polygons, no MultiPolygons, Lines, Points, etc
export function all_polygons(geodata: GeoJsonFeatureCollection): boolean {
  return geodata.features.map(feature => feature.geometry.type).every(type => type ==='Polygon')
}