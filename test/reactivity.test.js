import { expect, describe, it } from "vitest";
import { signal } from "../src/reactivity";

describe("reactivity", () => {
  it("get the initial value", () => {
    const initial = 0;
    const [get] = signal(initial);

    expect(get()).toEqual(initial);
  });
});
