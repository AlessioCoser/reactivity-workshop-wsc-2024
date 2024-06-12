import { createElement } from "../../src/dom";
import { signal } from "../../src/reactivity";

const App = () => {
  const [counter, setCounter] = signal(0);

  const button = createElement("button", { children: counter })
  button.onclick = () => setCounter(counter() + 1);

  return button
};

document.body.appendChild(App());

