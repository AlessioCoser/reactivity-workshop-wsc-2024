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

  it("create a div element with multiple different children", () => {
    const [count, setCount] = signal(10);
    const child = createElement("strong", { children: "count" });

    const element = createElement("div", { children: [child, " is ", count, null] });

    body.appendChild(element);
    expect(body.innerHTML).toEqual("<div><strong>count</strong> is 10</div>");
    setCount(20);
    expect(body.innerHTML).toEqual("<div><strong>count</strong> is 20</div>");
  });

  it("create an element using a custom element as tag", () => {
    function CustomElement({ tag }) {
      return createElement(tag, { children: "custom" });
    }

    const element = createElement(CustomElement, { tag: "strong" });

    body.appendChild(element);
    expect(body.innerHTML).toEqual("<strong>custom</strong>");
  });

  it("create a div element that changes the text child on click", () => {
    const [greet, setGreet] = signal("Hello World!");
    const onClick = () => setGreet("Ciao Mondo!");

    const element = createElement("div", { onClick, children: greet });
    body.appendChild(element);

    expect(body.innerHTML).toEqual(`<div>Hello World!</div>`);
    body.querySelector("div")?.click();
    expect(body.innerHTML).toEqual(`<div>Ciao Mondo!</div>`);
  });

  // TODO
  //  see: examples/03_greeting/index.js
  //  run: npm run start:greeting

  it("create <a> element with simple properties", () => {
    const [className, setClassName] = signal("aClass");
    const [href, setHref] = signal("#aLink");

    const element = createElement("a", { href, className });
    body.appendChild(element);

    expect(body.innerHTML).toEqual(`<a href="#aLink" class="aClass"></a>`);
    setClassName("anotherClass");
    setHref("#anotherLink");
    expect(body.innerHTML).toEqual(`<a href="#anotherLink" class="anotherClass"></a>`);
  });
});
