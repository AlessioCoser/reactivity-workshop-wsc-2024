import { expect, describe, it, beforeEach } from "vitest";
import { createElement } from "../src/dom";

const body = document.body;

describe("dom", () => {
  beforeEach(() => {
    body.innerHTML = "";
  });

  it("create an element", () => {
    const element = createElement("div");
    body.appendChild(element);

    expect(body.innerHTML).toEqual("<div></div>");
  });

  it("create a div element with a single text child", () => {
    const element = createElement("div", { children: "ciao" });
    body.appendChild(element);

    expect(body.innerHTML).toEqual("<div>ciao</div>");
  });

  it("create a div element with a single reactive text child", () => {
    const [count, setCount] = signal(10);

    const element = createElement("div", { children: () => `Size: ${count()}px` });
    body.appendChild(element);

    expect(body.innerHTML).toEqual("<div>Size: 10px</div>");
    setCount(20);
    expect(body.innerHTML).toEqual("<div>Size: 20px</div>");
  });

  // TODO
  //  see: examples/02_counter/index.js
  //  run: npm run start:counter

  it("create a div element with a single element as a child", () => {
    const child = createElement("span", { children: "child" });
    const element = createElement("div", { children: child });

    body.appendChild(element);
    expect(body.innerHTML).toEqual("<div><span>child</span></div>");
  });
});
