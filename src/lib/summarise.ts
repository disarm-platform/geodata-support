import { TFieldSummary } from './process';
import { GeoJson } from './support/TGeoJSON';
import { validate } from './validate';

export interface TLayerSummary {
  layer_name: string;
  file_reference: string; // Some ref, to find file from DB
  fields_summary: TFieldSummary[];
}

export function summarise(geodata: GeoJson): TLayerSummary[] {
  if (!validate(geodata)) return {}; // Check we've got inputs required
  // do "field analysis" of geodata and get back TFieldSummary[] for each layer
  return {
    layers_summary,
    status,
    messages
  };
}