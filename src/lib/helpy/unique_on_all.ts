import { get } from 'lodash';
import { features_where_found } from './features_where_found';

export function unique_on_all(field_name, properties_array): boolean {
  const features = features_where_found(field_name, properties_array);

  const unique_values = [...new Set(features.map(p => get(p, field_name)))].filter(i => i);
  return unique_values.length === features.length;
}