import { has } from 'lodash';

export function features_where_found(field_name, properties_array): any[] {
  return properties_array.filter(properties => has(properties, field_name));
}