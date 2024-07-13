import { createEffect, createSignal } from "solid-js";
import { App } from "../gl/app";
import { webgl, setWebgl } from "~/stores/webgl";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  createEffect(() => {
    App.stateChange(count());

    // console.log("webgl alive (store)", webgl.alive);
  });

  return (
    <button class="" onClick={() => setCount(count() + 1)}>
      Clicks: {count()}
    </button>
  );
}
