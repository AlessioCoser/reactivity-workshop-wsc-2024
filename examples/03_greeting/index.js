import { createElement } from "../../src/dom";
import { signal } from "../../src/reactivity";

const Greeting = (name) => {
  return createElement("span", { children: () => `Hello, ${name() || "World"}!` });
}

const App = () => {
  const [name, setName] = signal("");

  const onKeyup = (e) => setName(e.target.value);

  return createElement("div", { children: [
    Greeting(name),
    createElement("input", { onKeyup })
  ] });
};

document.body.appendChild(App());

