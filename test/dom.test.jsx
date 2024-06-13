// @ts-nocheck
import { expect, describe, it, beforeEach } from "vitest";
import { signal } from "../src/reactivity";

const body = document.body;

describe("JSX", () => {
  beforeEach(() => {
    body.innerHTML = "";
  });

  it("create a JSX element that handle the reactivity of some props and children", () => {
    const [color, setColor] = signal("red");
    const onclick = () => setColor("green");

    const element = <div onClick={onclick}>
      <p>color is:</p>
      <span className={color}>{color}</span>
    </div>

    body.appendChild(element);

    expect(body.innerHTML).toEqual(`<div><p>color is:</p><span class="red">red</span></div>`);
    body.querySelector("div")?.click();
    expect(body.innerHTML).toEqual(`<div><p>color is:</p><span class="green">green</span></div>`);
  });
});
