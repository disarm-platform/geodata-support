import { TGeodataLayer } from '../../config_types/TGeodata';
import { unique_on_all } from '../helpers/unique_on_all';
import { exists_on_all_features } from '../helpers/exists_on_all';
import { unique_fields } from '../helpers/unique_fields';
import { get_type } from '../helpers/get_type';

export enum EFieldType {
  NotSet = 'NotSet', // Initial value
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Unreliable = 'Unreliable',
}

export interface TFieldSummary {
  field_name: string;
  exists_on_all: boolean;
  type: EFieldType; // Checks only those values given, so use with exists_on_all
  unique: boolean; // Checks only those values given, so use with exists_on_all
  sample_values?: string[]; // Optional sample of the values for the field
}

export function summarise(layer: TGeodataLayer): TFieldSummary[] {
  const all_properties = layer.features.map(f => f.properties);

  // Get all unique fields from all properties
  const fields = unique_fields(all_properties);

  // Iterate the fields
  return fields.map(field_name => {
    return {
      field_name: field_name,
      // Check if exist on all features
      exists_on_all: exists_on_all_features(field_name, all_properties),
      unique: unique_on_all(field_name, all_properties),

      // Get type and check if consistent on all features
      type: get_type(field_name, all_properties)

    } as TFieldSummary;
  });
}

