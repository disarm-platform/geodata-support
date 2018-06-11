import { GeoJson } from './support/TGeoJSON';

export interface TGeodataSummary {
  fields_summary: TFieldSummary[],
  location_selection: string[],
}

export interface TFieldSummary {
  field_name: string,
  type: string;
  exists_on_all: boolean; // Exists on every feature
  unique: boolean; // Where it exists, is it unique
}

export function process(geodata: GeoJson): TGeodataSummary {
  if (geodata) {};
  return {} as TGeodataSummary
}