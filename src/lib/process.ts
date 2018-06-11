import { TGeodataSummary } from '../../build/main/lib/process';
import { TSpatialHierarchy } from './config_types/TSpatialHierarchy';
import { GeoJson } from './support/TGeoJSON';

export interface TGeodataSummary {
  metadata: {
    valid: boolean; // Whether
  },
  layers: [{
    layer_name: string;
    file_reference: string; // Some ref, to find file from DB
    fields_summary: TFieldSummary[];
    location_selection: null | TLocationSelection[]; // Is null
  }]
}

export interface TFieldSummary {
  field_name: string,
  type: string;
  type_is_consistent: boolean;
  exists_on_all: boolean; // Exists on every feature
  unique: boolean; // Where it exists, is it unique
}

export interface TLocationSelection {
  id: string | number;
  name: string;
  category: string; // The reference to the parent/grouping object
}

export function process(geodata: GeoJson, spatial_hierarchy: TSpatialHierarchy): TGeodataSummary {
  return null;
}
