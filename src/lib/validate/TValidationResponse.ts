export interface TValidationResponse {
  readonly status: EValidationStatus;
  readonly message: string;
  readonly support_messages?: string[];
}

export enum EValidationStatus {
  Green = 'Green, passed schema validation',
  Red = 'Red, failed schema validation',
}
