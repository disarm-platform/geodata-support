import { has } from 'lodash';

export function exists_on_all_features(field_name, properties_array): boolean {
  return properties_array.every(property => has(property, field_name));
}