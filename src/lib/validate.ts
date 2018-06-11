import { JSONSchema4 } from "json-schema";
import GeojsonSchema from "./support/geojson.schema.json";
import { GeoJson } from "./support/TGeoJSON";
import { ESchemaStatus } from "./TSchemaResponse";
import { validate_schema } from "./validate_schema";

export function validate(geodata: GeoJson): TUnifiedResponse {
  if (geodata) { }

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

function determine_response(schema_response, custom_responses): TUnifiedResponse {
  if (schema_response && custom_responses) { }

  if (schema_response.status === ESchemaStatus.Green) {
    return {
      message: 'passes schema validation',
      status: EUnifiedStatus.Green
    }
  } else if (schema_response.status === ESchemaStatus.Red) {
    return {
      message: "fails schema validation",
      status: EUnifiedStatus.Red
    }
  }

  return {
    message: "Some message",
    status: EUnifiedStatus.Red,
  };
}

export interface TValidationResponse {
  readonly status: EValidationStatus;
  readonly message: string;
}

export enum EValidationStatus {
  Green,
  Red,
}

export enum EUnifiedStatus {
  Green,
  Red,
}

export interface TUnifiedResponse {
  readonly message: string;
  readonly status: EUnifiedStatus;
}
