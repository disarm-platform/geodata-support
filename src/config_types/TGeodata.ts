import { GeoJsonFeatureCollection } from './TGeoJSON';
import { EValidationStatus } from './TValidationResponse';
import { TFieldSummary } from './TGeodataSummary';

export interface TGeodata {
  [k: string]: TGeodataLayer
}

// might want to rename it, would like it to just be TGeodataLayer, but then TGeodataLayer needs to be renamed
// not used inside this lib, only externally
export interface TGeodataLayerDefinition {
  name: string;
  file_name: string;
  validation_status: EValidationStatus;
  field_summary: TFieldSummary[];
}

/**
 * A GeoJsonFeatureCollection describing a single layer of geodata
 */
export interface TGeodataLayer extends GeoJsonFeatureCollection {
  properties?: {
    data_version: number;
  }
}