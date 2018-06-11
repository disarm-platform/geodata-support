import { GeoJson } from './support/TGeoJSON';

export function summarise(geodata: GeoJson): TLayersSummary {
  if (!validate(geodata)) return {}; // Check we've got inputs required
  // do "field analysis" of geodata and get back TFieldSummary[] for each layer
  return {
    layers_summary,
    status,
    messages
  };
}