import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect } from "solid-js";
import { setOutTransition, outTransitions } from "../index";

export function onOut(fn) {
  setOutTransition("elements", [...outTransitions.elements, fn]);
}

export function onView(
  ref,
  { onIn = () => {}, onOut = () => {}, once = true } = {},
) {
  const vo = createVisibilityObserver({ threshold: 0.5 });
  const visible = vo(ref);

  createEffect(() => {
    if (visible()) {
      if (onIn) onIn();
    } else {
      if (onOut) onOut();
    }
  });
}
