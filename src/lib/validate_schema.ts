// tslint:disable
import Ajv from 'ajv';
import { ESchemaStatus, TSchemaResponse } from './TSchemaResponse';
import { JSONSchema4 } from 'json-schema';
import { GeoJson } from './TGeoJSON';

const ajv = new Ajv();

export function validate_schema(config: GeoJson, config_schema: JSONSchema4): TSchemaResponse {
  const schema_valid = ajv.validate(config_schema, config);

  if (schema_valid) {
    return {
      status: ESchemaStatus.Green,
      errors: 'Schema validation passed'
    };
  } else {
    return {
      status: ESchemaStatus.Red,
      errors: `Schema validation errors: ${ajv.errorsText()}`
    };
  }
}
