import { flatten, uniq } from 'lodash';

export function unique_fields(properties_array): string[] {
  return uniq(flatten(properties_array.map(p => Object.keys(p))));
}