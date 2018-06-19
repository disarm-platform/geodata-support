import { get, uniq } from 'lodash';
import { EFieldType} from '../../config_types/TGeodataSummary';
import { features_where_found } from './features_where_found';

export function get_type(field_name, properties_array): EFieldType {
  const properties = features_where_found(field_name, properties_array);

  // get the type for the field on each feautre.properties
  const types = properties.map(f => typeof get(f, field_name))

  const unique_types = uniq(types)

  if (unique_types.length === 1) {
    const type = unique_types[0]
    switch (type) {
      case 'string':
        return EFieldType.String;
      case 'number':
        return EFieldType.Number;
      case 'boolean':
        return EFieldType.Boolean;
      default:
        return EFieldType.Unreliable;
    }
  } else {
    return EFieldType.Unreliable;
  }
}