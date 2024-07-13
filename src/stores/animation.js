import { createStore } from "solid-js/store";

const [animateOut, setAnimateOut] = createStore({
  alive: false,
});

export { animateOut, setAnimateOut };
