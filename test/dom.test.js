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
});
