import { expect, describe, it } from "vitest";
import { effect, signal } from "../src/reactivity";

describe("reactivity", () => {
  it("get the initial value", () => {
    const initial = 0;
    const [get] = signal(initial);

    expect(get()).toEqual(initial);
  });

  it("set a new value", () => {
    const [get, set] = signal(0);

    set(1);

    expect(get()).toEqual(1);
  });

  it("register for a value change", () => {
    const calls = [];
    const [get, set] = signal(0);

    effect(() => calls.push(get()));
    set(1);
    set(2);
    set(3);

    expect(calls).toEqual([0, 1, 2, 3]);
  });
});
