import { TGeodataLayer } from '../../config_types/TGeodata';

// Geodata features are only Polygons, no MultiPolygons, Lines, Points, etc
// They can also be empty
export function all_polygons(layer: TGeodataLayer): boolean {
  if (!layer.features) return true; // Features can be empty and still valid
  return layer.features.map(feature => feature.geometry.type).every(type => type ==='Polygon')
}