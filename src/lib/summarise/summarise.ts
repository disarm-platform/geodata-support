import { TFieldSummary } from '../process/process';
import { GeoJsonFeatureCollection } from '../../config_types/TGeoJSON';
import { validate_geodata } from '../validate/index';
import { EValidationStatus } from '../validate/TValidationResponse';

export interface TLayerSummary {
  layer_name?: string;
  file_reference?: string; // Some ref, to find file from DB
  fields_summary?: TFieldSummary[];
  status: EValidationStatus;
  message: string;
}

export function summarise(geodata: GeoJsonFeatureCollection): TLayerSummary {

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