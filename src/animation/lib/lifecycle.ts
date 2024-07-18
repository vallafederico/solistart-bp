import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { createEffect } from "solid-js";
import { setOutTransition, outTransitions } from "../index";

type Callback = ((duration?: number) => void) | (() => Promise<void>);

export function onPageLeave(fn: Callback) {
  setOutTransition("elements", [...outTransitions.elements, fn]);
}

export function onIntersect(
  ref: HTMLElement,
  { onEnter = () => {}, onLeave = () => {}, once = true, threshold = 0.2 } = {},
) {
  const vo = createVisibilityObserver({ threshold });
  const visible = vo(ref);

  createEffect(() => {
    if (visible()) {
      if (onEnter) onEnter();
    } else {
      if (onLeave) onLeave();
    }
  });
}
