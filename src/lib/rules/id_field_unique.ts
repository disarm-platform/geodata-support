import { GeoJsonFeatureCollection } from '../TGeoJSON'

// Given ID field must be unique
export function id_field_unique(geodata: GeoJsonFeatureCollection, id_field: string): boolean {
  const all_values = geodata.features.map(f => f.properties[id_field])
  const unique_values = new Set(all_values)
  return all_values.length === unique_values.size
}