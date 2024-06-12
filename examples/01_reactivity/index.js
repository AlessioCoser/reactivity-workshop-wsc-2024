import { effect, signal } from "../../src/reactivity";

const [counter, setCounter] = signal(0);

setInterval(() => {
  setCounter(counter() + 1)
}, 1000);

effect(() => document.querySelector('h1').textContent = String(counter()));
