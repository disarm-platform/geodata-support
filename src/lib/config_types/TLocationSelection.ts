// Copied from config-validation
export interface TLocationSelectionOption {
  id: number | string;
  name: string;
  category: string;
}

export interface TLocationSelection {
  [k: string]: TLocationSelectionOption[];
}