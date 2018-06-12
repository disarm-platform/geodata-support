import { GeoJsonFeatureCollection } from '../../config_types/TGeoJSON';
import { TSpatialHierarchy } from '../../config_types/TSpatialHierarchy';
import { TFieldSummary } from '../process/process';
import { validate_geodata } from '../validate';
import { EValidationStatus } from "../validate/TValidationResponse";

export interface TLayerSummary {
  layer_name: string;
  file_reference?: string; // Some ref, to find file from DB
  fields_summary?: TFieldSummary[];
}

export function summarise(geodata: GeoJsonFeatureCollection): TLayerSummary[] {

  const valid = validate_geodata(geodata);

  if (valid.status === EValidationStatus.Red) {
    return valid;
  } else {
    return {
      message: 'Something else',
      status: EValidationStatus.Green
    };
  } // Check we've got inputs required
  // do "field analysis" of geodata and get back TFieldSummary[] for each layer
  // return {
  //   layers_summary,
  //   status,
  //   messages
  // };
}