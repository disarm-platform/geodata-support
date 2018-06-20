import { TValidationResponse } from "./TValidationResponse";

// Copied from config-validation
export interface TLocationSelectionOption {
  id: number | string;
  name: string;
  category: string;
}

export interface TLocationSelection {
  [k: string]: TLocationSelectionOption[];
}

export interface TLocationSelectionResponse extends TValidationResponse {
  location_selection?: TLocationSelection;
}