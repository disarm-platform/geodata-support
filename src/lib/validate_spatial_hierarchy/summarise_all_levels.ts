import { summarise, TFieldSummary } from "../summarise/summarise";

export interface TGeodataSummary {
  [k: string]: TFieldSummary[]
}

export function summarise_all_levels(geodata): TGeodataSummary {
  return Object.keys(geodata).reduce((acc, name) => {
    return {...acc, [name]: summarise(geodata[name])}
  }, {})
}
