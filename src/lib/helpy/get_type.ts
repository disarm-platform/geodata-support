import { get } from 'lodash';
import { EFieldType} from '../../config_types/TGeodataSummary';
import { features_where_found } from './features_where_found';

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