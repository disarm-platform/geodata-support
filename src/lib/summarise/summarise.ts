import { flatten, uniq } from 'lodash';
import { TGeodataLayer } from '../../config_types/TGeodata';

export interface TFieldSummary {
  field_name: string;
  type: string;
  exists_on_all: boolean;
  consistent_type: boolean; // Cannot be true unless also `exists_on_all`
  unique: boolean;
}

export function summarise(layer: TGeodataLayer): TFieldSummary[] {
  const all_properties = layer.features.map(f => f.properties);

  // Get all unique fields from all properties
  unique_fields(all_properties);

  // Check if exist on all features

  // Check if unique on all features

  // Get type and check if consistent on all features

  // Figure out how to describe, and return
}

export function unique_fields(properties_array): string[] {
  return uniq(flatten(properties_array.map(p => Object.keys(p))));
}