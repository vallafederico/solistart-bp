import { createStore } from "solid-js/store";

interface Controller {
  page: string;
  state: "idle" | "loading" | "transition";
}

const [ctrl, setCtrl] = createStore({
  // global router
  page: "home",
  state: "loading",
});

export { ctrl, setCtrl };
