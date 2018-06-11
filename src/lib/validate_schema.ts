// tslint:disable
import Ajv from 'ajv';
import { GeoJson } from './support/TGeoJSON';
import { EValidationStatus, TValidationResponse } from './validate';
import GeojsonSchema from './support/geojson.schema.json';

const ajv = new Ajv();

export function validate_schema(config: GeoJson): TValidationResponse {
  const geojson_schema = GeojsonSchema;
  const schema_valid = ajv.validate(geojson_schema, config);

  if (schema_valid) {
    return {
      status: EValidationStatus.Green,
      message: 'Schema validation passed'
    };
  } else {
    return {
      status: EValidationStatus.Red,
      message: `Schema validation errors`,
      support_messages: ajv.errors.map(e => e.message)
    };
  }
}
