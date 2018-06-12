import { flatten, get, has, uniq } from 'lodash';
import { TGeodataLayer } from '../../config_types/TGeodata';

export enum EFieldType {
  NotSet = 'NotSet', // Initial value
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Unreliable = 'Unreliable',
}

// export type EFieldTypeR = 'string' | 'number' | 'boolean' | 'inconsistent';

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

export function unique_fields(properties_array): string[] {
  return uniq(flatten(properties_array.map(p => Object.keys(p))));
}

export function exists_on_all_features(field_name, properties_array): boolean {
  return properties_array.every(property => has(property, field_name));
}

export function unique_on_all(field_name, properties_array): boolean {
  const features = features_where_found(field_name, properties_array);

  const unique_values = [...new Set(features.map(p => get(p, field_name)))].filter(i => i);
  return unique_values.length === features.length;
}

export function get_type(field_name, properties_array): EFieldType {
  const features = features_where_found(field_name, properties_array);

  return features.reduce((existing_type, properties) => {
    let current_type: EFieldType;
    const type = typeof get(properties, field_name);

    switch (type) {
      case 'string':
        current_type = EFieldType.String;
        break;
      case 'number':
        current_type = EFieldType.Number;
        break;
      case 'boolean':
        current_type = EFieldType.Boolean;
        break;
      default:
        current_type = EFieldType.Unreliable;
    }

    const already_inconsistent = existing_type === EFieldType.Unreliable;
    const already_set = existing_type !== EFieldType.NotSet;
    const different_to_existing = current_type !== existing_type;

    // Couple of special cases
    if (already_inconsistent) return existing_type;
    if (already_set && different_to_existing) return EFieldType.Unreliable;

    // Otherwise give me what I'd expect
    return current_type;

  }, EFieldType.NotSet);
}

function features_where_found(field_name, properties_array) {
  return properties_array.filter(properties => has(properties, field_name))
}