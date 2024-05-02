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
});
