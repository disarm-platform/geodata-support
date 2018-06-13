import { TGeodataSummary } from '../../config_types/TGeodataSummary';
import { summarise } from '../summarise';

export function summarise_all_levels(geodata): TGeodataSummary {
  return Object.keys(geodata).reduce((acc, name) => {
    return {...acc, [name]: summarise(geodata[name])}
  }, {})
}
