/* tslint:disable */
import test from "ava";
import { EUnifiedStatus, validate } from "./validate";

test("title", (t) => {
  const simplest_valid_geojson = {
    features: [],
    type: "FeatureCollection",
  };

  const actual = validate(simplest_valid_geojson);
  t.is(actual.status, EUnifiedStatus.Red);
});
