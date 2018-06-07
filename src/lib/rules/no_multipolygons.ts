import { GeoJsonFeatureCollection } from "../TGeoJSON";

// Geodata contains no multipolygons
export function no_multipolyons(geodata: GeoJsonFeatureCollection): boolean {
  return !geodata.features.map(feature => feature.geometry.type).includes('MultiPolygon')
}