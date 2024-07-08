import { createStore } from "solid-js/store";

const [webgl, setWebgl] = createStore({
  alive: false,
});

export { webgl, setWebgl };
