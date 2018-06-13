export enum EFieldType {
  NotSet = 'NotSet', // Initial value
  String = 'String',
  Number = 'Number',
  Boolean = 'Boolean',
  Unreliable = 'Unreliable',
}

export interface TFieldSummary {
  field_name: string;
  exists_on_all: boolean; // The field exists on every feature
  type: EFieldType; // Checks only those values given, so use with exists_on_all
  unique: boolean; // Checks only those values given, so use with exists_on_all
  sample_values?: string[]; // Optional sample of the values for the field
}

export interface TGeodataSummary {
  [k: string]: TFieldSummary[]
}