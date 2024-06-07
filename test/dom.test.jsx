// @ts-nocheck
import { expect, describe, it, beforeEach } from "vitest";
import { signal } from "../src/reactivity";

const body = document.body;

describe("JSX", () => {
  beforeEach(() => {
    body.innerHTML = "";
  });

  it.skip("create a JSX element that handle the reactivity of some props and children", () => {
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

  // TODO
  //  see: examples/04_quotes/index.js
  //  run: npm run start:quotes

  it.skip("create a div element with children as a reactive array", () => {
    const [children, setChildren] = signal(["one", "two", "three"]);

    const element = <div>{() => children().map((item) => <p>{item}</p>)}</div>;

    body.appendChild(element);
    expect(body.innerHTML).toEqual("<div><p>one</p><p>two</p><p>three</p></div>");
    setChildren(["four", "five", "six"]);
    expect(body.innerHTML).toEqual("<div><p>four</p><p>five</p><p>six</p></div>");
  });

  // TODO
  //  see: examples/05_todolist/index.js
  //  run: npm run start:todolist

  it.skip("create a div element with a reactive style color property", () => {
    const [color, setColor] = signal("red");

    const element = <div style={{ color }} onClick={() => setColor("green")}></div>;
    body.appendChild(element);

    expect(body.innerHTML).toEqual(`<div style="color: red;"></div>`);
    body.querySelector("div")?.click();
    expect(body.innerHTML).toEqual(`<div style="color: green;"></div>`);
  });
});
