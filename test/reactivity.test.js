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

  it("a value change should affect only the registered effects", () => {
    const calls = [];
    const [get, set] = signal(0);
    const [anotherGet, anotherSet] = signal(11)

    effect(() => calls.push(get()));
    set(1);
    anotherSet(12);
    set(2);
    set(3);

    expect(calls).toEqual([0, 1, 2, 3]);
  });

  // TODO
  //  see: examples/01_reactivity/index.js
  //  run: npm run start:reactivity
});
