export enum ESchemaStatus {
  Green = "Green, passed schema validation",
  Red = "Red, failed schema validation",
}

export interface TSchemaResponse {
  readonly status: ESchemaStatus;
  readonly errors: string;
}
