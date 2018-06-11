/* tslint:disable */
import test from "ava";
import { EValidationStatus, validate } from "./validate";

test("passes simplest valid geojson", (t) => {
  const simplest_valid_geojson = {
    features: [],
    type: "FeatureCollection",
  };

  const actual = validate(simplest_valid_geojson);
  t.is(actual.status, EValidationStatus.Green);
  t.is(actual.message, "passes schema validation");
});

test("broken config", t => {
  const broken_geojson = {
    feature: [],
    type: 'Something else'
  }
  // @ts-ignore
  const actual = validate(broken_geojson);
  t.is(actual.status, EValidationStatus.Red)
  t.is(actual.message, "fails schema validation")
})
