import { JSONSchema4 } from 'json-schema';
import { TSpatialHierarchy } from './config_types/TSpatialHierarchy';
import GeojsonSchema from './support/geojson.schema.json';
import { GeoJson } from './support/TGeoJSON';
import { validate_schema } from './validate_schema';

export interface TValidationResponse {
  readonly status: EValidationStatus;
  readonly message: string;
  readonly support_messages?: string[];
}

export enum EValidationStatus {
  Green = 'Green, passed schema validation',
  Red = 'Red, failed schema validation',
}

/**
 * Validate geodata
 * @param {GeoJson} geodata
 * @returns {TValidationResponse}
 */
export function validate(geodata: GeoJson): TValidationResponse {
  //
  // STEP 0 - Gather what you need
  // After this step, no more data/config can be loaded
  //
  const config_schema = GeojsonSchema as JSONSchema4;

  //
  // STEP 1 - Schema validation
  //
  const schema_response = validate_schema(geodata, config_schema);

  //
  // STEP 2 - Custom validations
  //
  const custom_responses: ReadonlyArray<any> = [];

  //
  // STEP 3 - Determine response
  //
  return determine_response(schema_response, custom_responses);
}

/**
 * Validate `spatial_hierarchy`
 * @param {TSpatialHierarchy} spatial_hierarchy
 */
export function validate_spatial_hierarchy(spatial_hierarchy: TSpatialHierarchy): TValidationResponse {
  // Validate against schema

  // What special things do we need to check?
  return null
}

