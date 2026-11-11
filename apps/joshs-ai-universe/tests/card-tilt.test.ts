import { describe, expect, it } from "vitest";
import { getCardTilt } from "../lib/card-tilt";
const bounds = { left: 20, top: 10, width: 400, height: 200 };
describe("restrained card perspective", () => {
  it("stays neutral at the center and rotates toward opposite corners", () => {
    expect(getCardTilt(220, 110, bounds)).toEqual({
      x: 0,
      y: 0,
      lightX: 50,
      lightY: 50,
    });
    expect(getCardTilt(20, 10, bounds)).toEqual({
      x: 2.5,
      y: -2.5,
      lightX: 0,
      lightY: 0,
    });
    expect(getCardTilt(420, 210, bounds)).toEqual({
      x: -2.5,
      y: 2.5,
      lightX: 100,
      lightY: 100,
    });
  });
  it("clamps stale pointer positions and collapses zero-size bounds safely", () => {
    expect(getCardTilt(-900, 900, bounds)).toEqual({
      x: -2.5,
      y: -2.5,
      lightX: 0,
      lightY: 100,
    });
    expect(getCardTilt(20, 10, { ...bounds, width: 0, height: 0 })).toEqual({
      x: 0,
      y: 0,
      lightX: 50,
      lightY: 50,
    });
  });
});
