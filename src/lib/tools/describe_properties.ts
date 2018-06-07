import { GeoJsonFeatureCollection } from "../TGeoJSON";

interface TPropertyDescription {
  name: string;
  type: string; // Result of typepof
  on_all: boolean; // Exists on every feature
  unique: boolean; // Where it exists, is it unique
}

interface TProperty {
  [k: string]: object;
}

export function describe_properties(geodata: GeoJsonFeatureCollection): TPropertyDescription[] {
  const properties = all_properties(geodata)
  if(properties){}
  return [{ name: 'id', type: 'number', on_all: true, unique: true }, { name: 'not_all', type: 'string', on_all: true, unique: true }]
}

export function all_properties(geodata: GeoJsonFeatureCollection) {
  return geodata.features.map(feature => feature.properties)
}

// for current property 'i', check for consistent type against all others
export function consistent_type(properties: TProperty[]) {
  return true
}

// for current property 'i', compare for uniqueness against others in 'acc'
export function check_unique(acc, i) {
}

// for current property 'i', check exists on all 
export function exists_on_all(property, properties) {
  
}
