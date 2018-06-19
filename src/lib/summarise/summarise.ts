import { TGeodataLayer } from '../../config_types/TGeodata';
import { TFieldSummary } from '../../config_types/TGeodataSummary';
import { exists_on_all_features } from '../helpy/exists_on_all';
import { get_type } from '../helpy/get_type';
import { unique_fields } from '../helpy/unique_fields';
import { unique_on_all } from '../helpy/unique_on_all';

export function summarise(layer: TGeodataLayer): TFieldSummary[] {
  const all_properties = layer.features.map(f => f.properties);

  // Get all unique fields from all properties
  const fields = unique_fields(all_properties);

  // Iterate the fields
  return fields.map(field_name => {
    const field_summary: TFieldSummary = {
      field_name,
      // Check if exist on all features
      exists_on_all: exists_on_all_features(field_name, all_properties),
      unique: unique_on_all(field_name, all_properties),

      // Get type and check if consistent on all features
      type: get_type(field_name, all_properties)

    };
    return field_summary
  });
}

