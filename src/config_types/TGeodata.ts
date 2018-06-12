import { GeoJsonFeatureCollection } from './TGeoJSON';

export interface TGeodata {
  [k: string]: TGeodataLayer
}

/**
 * A GeoJsonFeatureCollection describing a single layer of geodata
 */
export interface TGeodataLayer extends GeoJsonFeatureCollection {
  properties?: {
    data_version: number;
  }
}