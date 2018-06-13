import { summarise } from "../summarise/summarise";

export function summarise_all_levels(geodata) {
  return Object.keys(geodata).reduce((acc, name) => {
    return {...acc, [name]: summarise(geodata[name])}
  }, {})
}
